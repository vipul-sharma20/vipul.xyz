---
layout: single
title:  "Load Balancing UniMRCP server with OpenSIPS"
excerpt: "Walkthrough on how to use OpenSIPS to load balance thousands of concurrent calls among multiple UniMRCP servers"
date:   2020-06-07 14:30:12 +0530
subtitle: "You're going to love this."
toc: true
toc_sticky: true
toc_label: "Contents"
permalink: "/2020/06/mrcp-server-load-balancer.html"
---

## About

In this post I'll explain how we use OpenSIPS 2.4.7 (LTS) for load balancing
SIP traffic among multiple MRCP servers in [Vernacular.ai][company]
deployments.

Our MRCP server is built over [UniMRCP][0], an open source cross-platform
implementation of MRCP protocol.  This post can help anyone trying to load
balance traffic among multiple UniMRCP servers (referred as MRCP servers
hereafter)

[OpenSIPS][1] is a GPL implementation of a multi-functionality SIP Server that
targets to deliver a high-level technical solution (performance, security and
quality) to be used in professional SIP server platforms.

OpenSIPS provides a variety of modules which help to implement these solutions.
For our load balancer, we use OpenSIPS' `load_balancer` module to achieve this.

Our load balancer code is published at: [https://github.com/Vernacular-ai/mrcp-load-balancer](https://github.com/Vernacular-ai/mrcp-load-balancer)

## Features of this Load Balancer

* Load distribution based on available MRCP server resources and usage.
* Check uptime of MRCP servers and route requests to active servers.
* Report live dialogs/calls.
* Retry fallback to other resources on session creation failure.

## Architecture

You can check the architecture diagram when a set of MRCP servers are deployed
with a load balancer below:

![alt text][2]

## Request Flow

Let's consider a scenario where a request from a client is routed to an MRCP
server via LB.  Reference diagram below shows the flow in red.

![alt text][3]

OpenSIPS is a SIP server and hence we use it as a SIP load balancer. Which
means that all the SIP requests received by the LB will be routed to the
appropriate MRCP servers.

When a SIP `INVITE` request is initiated by the client, it gets routed by
OpenSIPS `load_balancer` module to the appropriate available resource (MRCP
server) and adds a `Via` header which has the info of all the nodes a
particular SIP request has visited. This way once the request reaches a
destination, it has info (address) of all the nodes it has visited and hence
the address of the client who originated the request.

The server therefore, uses this client address and establishes a connection
with the client for RTP streams and MRCPv2 messages. In summary, SIP messages
are routed through the LB and after that all the RTP streams and MRCPv2
messages are communicated between the client and the server directly.

Check the sample flow diagram below for better understanding:

![alt text][4]

## OpenSIPS Scripting

OpenSIPS works on it's own scripting language which is similar to C and Bash
Script.  All the routing logic is kept in a cfg file which is given to OpenSIPS
when it is started.

The OpenSIPs configuration script has three main logical parts:

* Global parameters
* Modules section
* Routing logic

### Global parameters

These are basically the global core parameters which affects the OpenSIPS core and the modules being used by it.

Example:

```bash
# OpenSIPS listener transport type, host and port
listen = udp:172.31.24.28:9060
listen = tcp:172.31.24.28:9060
```

### Modules section
This section has definition of all the modules to be loaded for OpenSIPS and initialization of module parameters.

Example:

```bash
# LOAD BALANCER module
loadmodule "load_balancer.so"
modparam("load_balancer", "db_url", "text:///usr/src/opensips-2.4.7/dbtext")
modparam("load_balancer", "probing_method", "OPTIONS")
```

### Routing logic
This is where the magic happens. This section has all the SIP traffic routing conditions.

Example:

```bash
route{
    # Sends reply to a SIP OPTIONS request
    if (is_method("OPTIONS")) {
        options_reply();
    }
}
```

## How LB works in OpenSIPS?

Listed below are a few aspects of LB module:

### Destination Set
A destination is defined by its address (a SIP URI) and its description as
capacity. This destination is defined in a text DB for our deployment which can
be found at `opensips/dbtext/load_balancer`

```
+----+----------+------------------------+------------+
| id | group_id | dst_uri                | resources  |
+----+----------+------------------------+------------+
|  1 |        1 | sip:x.x.x.x:8060       | pstn=100   |
|  2 |        1 | sip:y.y.y.y:8060       | pstn=50    |
+----+----------+------------------------+------------+
```

These destinations determines the kind of services/resources they offer.

### Invoking the Load Balancer
You can  invoke the load balancer routing from `opensips.cfg` by calling the
appropriate functions defined in the `load_balancer` module. Here, we are using
the `lb_start_or_next` function which tries to route an incoming SIP `INVITE`
request to the destination and if the routing fails, it tries for the next
destination from the destination set until there are no available.

```bash
if (is_method("INVITE")) {
    if (!lb_start_or_next("1","pstn","1")) {
        send_reply("503","Service Unavailable");
        exit;
    }
}
```

### Load Balancing Logic
The logic used by the LB module to select the destination is:

Gets the destination set based on the `group_id` (first parameter of the
`lb_start_or_next()` function)

Selects from the set only the destinations that are able to provide the
requested resources (second parameter of the `lb_start_or_next()` function)

For the selected destinations, it evaluated the current load for each requested
resource the winning destination is the one with the biggest value for the
minimum available load per resources.

Example

```
2 destinations in the LB set

1) offers 100 channels for PSTN
2) offers 50 channels for PSTN

When calling lb_start_or_next("1","pstn")

Destinations (1) and (2) will be selected at as they both
offer pstn

Assume the current load as below

(1) PSTN - 20 channels used
(2) PSTN - 10 channels used

evaluating available load (capacity-load) :

(1) PSTN - 80 channels available
(2) PSTN - 40 channels available

final selected destination is (1) as it has the the biggest
(=80) available load for the most loaded resource.
```

## Flow diagram without LB

Checkout the SIP trace diagram for a call scenario without LB
![alt text][5]

## Flow diagram with LB

Checkout the SIP trace diagram for a call scenario with LB
![alt text][6]


## Modules Used
Apart from the internal modules used by OpenSIPS, we use some other modules needed by the load_balancer module. Following are a few important ones:

* [dialog module](https://opensips.org/html/docs/modules/2.4.x/dialog.html)
* [signalling module](https://opensips.org/html/docs/modules/2.4.x/signaling.html)
* [stateless module](https://opensips.org/docs/modules/2.4.x/sl.html)
* [options module](https://opensips.org/docs/modules/2.4.x/options.html)
* [transaction module](https://opensips.org/docs/modules/2.4.x/tm.html)
* [text db module](https://opensips.org/html/docs/modules/2.4.x/db_text.html)
* [dispatcher module](https://opensips.org/html/docs/modules/2.4.x/dispatcher.html)

## Advanced

A few good to know usage details of OpenSIPS

### Getting number of active calls/dialogs

`opensipsctl fifo get_statistics dialog:`

Example:

```
root@centosmrcp:/usr/src/opensips-2.4.7# opensipsctl fifo get_statistics dialog:
dialog:active_dialogs:: 120
dialog:early_dialogs:: 161
dialog:processed_dialogs:: 101002
dialog:expired_dialogs:: 14
dialog:failed_dialogs:: 23434
dialog:create_sent:: 100930
dialog:update_sent:: 12986
dialog:delete_sent:: 100927
dialog:create_recv:: 15
dialog:update_recv:: 23
dialog:delete_recv:: 24
```

Meaning of these values:

* `active_dialogs`: Number of active dialogs (confirmed/ACK or not)
* `early_dialogs`: Number of early dialogs (only provisional responses)
* `processed_dialogs`: Number of processed dialogs since startup
* `expired_dialogs`: Number of expired (timeout) dialogs since startup
* `failed_dialogs`: Number of failed dialogs (never established due to cancels and negative replies—internal and external)
* `create_sent`: Number of replicated dialog create requests sent to another instance (used when replicating dialogs between servers)
* `update_sent`: Number of replicated dialog update requests sent to another instance
* `delete_sent`: Number of replicated dialog delete requests sent to another instance
* `create_recv`: Number of dialog create events received from other instances
* `update_recv`: Number of dialog update events received from other instances
* `delete_recv`: Number of dialog delete events received from other instances

### Running OpenSIPS in foreground

`./opensips -f -F /path/to/opensips.cfg`

### Running OpenSIPS in debug mode

Set `debug_mode=yes` in `opensips.cfg` file. This will run OpenSIPS in debug mode in foreground.

### Log levels

Below are the log levels that can be configures in the `opensips.cfg` file:

```
# -3 - Alert level
# -2 - Critical level
# -1 - Error level
#  1 - Warning level
#  2 - Notice level
#  3 - Info level
#  4 - Debug level
log_level=1
```

### Active/Inactive Destinations (Pings)

OpenSIPS uses `OPTIONS` request to ping all the destinations to check their
state. Any destination not replying to these pings is marked as inactive and
remains to be until OpenSIPS receives a successful response of these pings. All
the traffic is routed to the active servers only.

These pings are only made when the destinations are added with probe mode is set as 2.

* 0: No probing
* 1: Probe on disable only
* 2: Always probe

### Failover mechanism for incoming requests

If an incoming request is routed by LB to a destination and it times out, it
gets routed to a different destination and the former destination is marked as
inactive. This destination remains as inactive until OpenSIPS receives a
successful ping from it.

### How many children are enough?

Answer:

```
There is no simple answer, choosing the appropriate number of children
is scenario-dependant.

If, for example, you are not performing I/O operations (DB queries, exec
commands, etc.), then the number of children should be dictated by the
number of cores on your box.

On the other side, when your SIP workers will perform lots of disk
operations (which are slow), then you should use a lot more children
than mentioned above. (e.g. 12, 16 or 20 children).

Best regards,

Liviu Chircu
OpenSIPS Developer
```

Source thread:
[https://opensips.org/pipermail/users/2013-December/027530.html](https://opensips.org/pipermail/users/2013-December/027530.html)

### Configuring UniMRCP client with Load Balancer

Edit the client-profiles config at:
`/usr/local/unimrcp/client-profiles/unimrcp.xml`

Update the server-ip and port:

```
<server-ip>172.31.24.28</server-ip> <!-- LB IP here -->
<server-port>9060</server-port>
```

Edit the `unimrcpclient.xml` at:

```
/usr/local/unimrcp/client-profiles/unimrcp.xml
```

Update the client's sip-transport type:

```
<sip-port>8062</sip-port>
<sip-transport>tcp</sip-transport>
```

Now the `run recog` request will go via LB.

## Contributing

For contribution and reporting issues please checkout the repository [here](https://github.com/Vernacular-ai/mrcp-load-balancer)


[0]: https://github.com/unispeech/unimrcp
[1]: https://github.com/OpenSIPS/opensips
[2]: /assets/images/lb_mrcp_architecture.png
[3]: /assets/images/request_flow.png
[4]: /assets/images/request_flow_complete.png
[5]: /assets/images/without_lb.png
[6]: /assets/images/lb.png
[company]: https://vernacular.ai
