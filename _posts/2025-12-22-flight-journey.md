---
layout: single
title: "Analyzing My Flight Journey Data"
permalink: "/2025/12/22/flight-journey/"
excerpt: "I tracked all the flights I've taken since 2016 and created interactive visualizations to explore my travel patterns, booking behaviors, and cost trends"
date: 2025-12-22
tags: [travel, visualization]
author_profile: false
image: "https://s3.vipul.xyz/blog/flight-chord.png"
---

<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/flight-journey.css">

I took my first flight ever in 2016 after graduation to travel from Delhi to
Bengaluru to start my professional career in Bengaluru.

Around the start of 2025, I spent around 4 hours digging through my emails to
log information of all my flight bookings and journey between 2016 and until
then (January 2025). I just used a filter _"has:attachment flight"_ in gmail
got a list of all the flight booking emails, went through all the ticket PDFs
manually and logged the information. You can call it inefficient and tell me 5
different ways to do it optimally but I have now already done it.

Since the start of 2025, I have been keeping this data updated with all my
flight travels.

In this post, I have created (with a lot of AI help) visualization of *almost*
all my flights, some analysis and reflection on the data collected and trends.

I'll be keeping all the stats in this post updated from time to time (maybe
once a few months). I'll keep it as a manual process intentionally. <br><br>
While the visualizations will have an eventual consistency, the text content
might still be out-of-date and remain as a reflection of when it was originally
written in November 2025
{: .notice--info}

## My Flights

Below is a map of all my 114 flights since 2016. I have also created an
animated view for myself that plays all the flight travels in chronological
order. I'll be adding annotations, stories etc. for all my travels and maintain
a nice travel log. It'll act as a story view but I'll keep that for myself.

<iframe id="flight-routes-static-iframe" src="{{ site.baseurl }}/assets/html/flights/maps/flight-routes-static.html" width="100%" height="80vh" frameborder="0" scrolling="no" style="border: 1px solid #000; border-radius: 8px; display: block; min-height: 600px; max-height: 900px; touch-action: pan-y; overflow: hidden;"></iframe>


<iframe class="viz-iframe-stats" src="{{ site.baseurl }}/assets/html/flights/stats/flight-stats.html" width="100%" height="150px" frameborder="0" scrolling="no"></iframe>

<iframe class="viz-iframe" src="{{ site.baseurl }}/assets/html/flights/patterns/flight-yearly.html" width="100%" height="435px" frameborder="0" scrolling="no"></iframe>

I started my first job in June 2016 right after graduating in May and that's
when I did my first air travel. Most of my flights from 2016 until the end of
2019 were to and fro from Bengaluru to my home with a few small flights for
vacations.

Post Covid lockdown relaxations, I started traveling more for vacations with
friends. This was also because I had enough money to do so and hence an
increasing trend in flight journeys post Covid.

My first International flight was in 2022. Since then, I have taken 26
international flights which makes it a little over 20% of all my flights.

<iframe class="viz-iframe" src="{{ site.baseurl }}/assets/html/flights/maps/flight-routes-chord.html" width="100%" height="720px" frameborder="0" scrolling="no"></iframe>

The Delhi-Bengaluru route for obvious reasons dominates my travel with 21
flights Delhi → Bengaluru and 16 flights Bengaluru → Delhi, which are around
one-third of all my flights. These are flights between my work city in
Bengaluru and my hometown, Delhi.

## Travel Patterns

Below are some set of plots to show distribution of flights by year, month, day
of the week & time of the day

<iframe class="viz-iframe" src="{{ site.baseurl }}/assets/html/flights/patterns/flight-heatmap.html" width="100%" height="620px" frameborder="0" scrolling="no"></iframe>

October (and November _kinda_) has been my most consistent month to travel
every year. This is primarily because of my travel back home for
[Diwali][diwali] which is roughly between the 2nd half of October and early
November.

<details>
<summary>Diwali dates by year <i>(click to expand)</i></summary>

<div class="diwali-table-wrapper" markdown="1">

| Year | Diwali Date |
|:----:|:-----------:|
| 2025 | October 20  |
| 2024 | November 1  |
| 2023 | November 12 |
| 2022 | October 24  |
| 2021 | November 4  |
| 2020 | November 14 |
| 2019 | October 27  |
| 2018 | November 6  |
| 2017 | October 19  |
| 2016 | October 29  |

</div>

</details>

April and August happen to be my least travel months in the last 9 years.

2018 had the longest period (7 months) when I didn't take any flights. This was
the time when I started my new job (which is still my current employer). And
the only 2 flights after the 7 months period were the round-trip travel for
Diwali to my hometown. Interestingly, even in the year of Covid lockdown, in
2020, my longest stretch of no flights was 6 months.

<iframe class="viz-iframe" src="{{ site.baseurl }}/assets/html/flights/patterns/flight-weekday-radial.html" width="100%" height="580px" frameborder="0" scrolling="no"></iframe>

General trend to notice is that most of the start of my journey is on Saturday
(23 flights) and return flights are on Monday (22 flights). This is because the
most expensive flights have been on Fridays for the destinations I have been to
and Sunday being the most expensive for return travels. This also explains why
Fridays have the least number of flights.

<iframe class="viz-iframe" src="{{ site.baseurl }}/assets/html/flights/patterns/flight-departure-time.html" width="100%" height="580px" frameborder="0" scrolling="no"></iframe>

Almost 50% of my flights have been between 04:00 - 12:00 (early morning /
morning) and TBH, I don't like these flights. One good thing about these
flights is that I don't have to face peak Bengaluru traffic if I am
departing/arriving in this time slot.

Interesting observation is that I have never taken a flight between 01:00 - 03:00.

<iframe class="viz-iframe" src="{{ site.baseurl }}/assets/html/flights/stats/flight-airlines.html" width="100%" height="600px" frameborder="0" scrolling="no"></iframe>

Indigo is the airline I have flown in the most which makes up 46% of the total
flights I have taken. This would probably be the case with most of the people
in India for domestic travels.

This blog post comes around a very interesting time when people in India faced
a lot of [disruptions][disruptions] with Indigo flights. My travel/flight was
also be impacted because of this disruption. My wife and I were traveling from
Hanoi to Bengaluru via Kolkata and my Kolkata to Bengaluru flight got
cancelled. I was lucky to get an alternate flight that was 14 hours later than
the original flight.

## Cost Analysis

Below are a few visualizations for analysis of cost trends over the year
considering a few dimensions.

<iframe class="viz-iframe" src="{{ site.baseurl }}/assets/html/flights/costs/flight-cost-timeline.html" width="100%" height="380px" frameborder="0" scrolling="no"></iframe>

Out of the 114 total flights, 14 flights were paid for and there were 6 that
were connecting. Which makes a total of ₹855k (~$10k) spent for effectively 94
flights.

<iframe class="viz-iframe" src="{{ site.baseurl }}/assets/html/flights/costs/all-flights-booking-advance.html" width="100%" height="690px" frameborder="0" scrolling="no"></iframe>

There's no clear pattern in the relationship between booking timing/number of
days booked in advance vs the cost. Time is just one of the dimensions that I
wanted to analyze against.

### Domestic Flight Cost Analysis

I have intentionally excluded international flights and created this section to
have a fair analysis of trends of domestic flight costs only.

<iframe class="viz-iframe" src="{{ site.baseurl }}/assets/html/flights/costs/domestic-cost-year.html" width="100%" height="490px" frameborder="0" scrolling="no"></iframe>

2024 appears to have higher absolute average costs at ₹7,901 average, the
inflation adjusted view *(you can click on the button on the chart to switch to
inflation adjusted view)* however shows that the real cost increase is more
moderate than it seems.

Overall, based on my flight experience/data, domestic flight prices have
increased, but not as dramatically when accounting for overall inflation.

<iframe class="viz-iframe" src="{{ site.baseurl }}/assets/html/flights/costs/domestic-cost-airline.html" width="100%" height="490px" frameborder="0" scrolling="no"></iframe>

This was another dimension that I wanted to analyze as airline is another
factor in the cost of a flight. For example: Air India is generally more
expensive than Indigo because of some of the perks (overall better service,
meals etc.).

SpiceJet is an airline that I try to refrain from as much as possible. But
because of Spicejet, I got the opportunity to get on to a [Dash 8-200][dash-8],
a high-wing, twin-engine turboprop aircraft.

Unfortunately, I couldn't get aircraft information about all the flights that I
have taken and that's why I didn't create a plot for it. I did try to ask LLM
to figure information out but I am not confident of its accuracy.

However, some general assumptions can be made through the airlines and the kind
of routes I have flown in. I know that most of the airlines (for the routes
that I have traveled) use [Airbus A320 family][a320] aircrafts with the exception of
Akasa that uses [Boeing 737 MAX][737]

<iframe class="viz-iframe" src="{{ site.baseurl }}/assets/html/flights/costs/diwali-flight-costs.html" width="100%" height="530px" frameborder="0" scrolling="no"></iframe>

[Diwali][diwali] is one of the biggest festivals in India and every year since
2016, I have traveled home through flight. These are my round-trip flight costs
each year for Diwali travel to/from home.

I was already at home during the Covid lockdown and hence there's no travel to
home flight specifically for Diwali in 2020.

Usually the prices for Diwali flights get inflated way over a few months before
the festival and it only gets worse from there.

<iframe class="viz-iframe" src="{{ site.baseurl }}/assets/html/flights/costs/diwali-booking-advance.html" width="100%" height="600px" frameborder="0" scrolling="no"></iframe>

The cheapest years (2021, 2023) were booked around 40-44 days in advance,
neither too early nor too late. For Diwali flights, overall demand, airline
pricing strats, and route availability seems to matter more than just booking
timing.

More than any visible cost trends through this plot, it looks like my Diwali
travel plans are generally decided more than 35 days in advance.

## Thoughts

1. As I mentioned earlier: I'll be keeping all the stats in this post updated
   from time to time (maybe once a few months). I'll keep it as a manual
   process intentionally. While the visualizations will have an eventual
   consistency, the text content might still be out-of-date and remain as a
   reflection of when it was originally written in November 2025

2. I feel that I made it a little hard for myself choosing a manual path to
   collect all the data that took a lot of time. Atleast I don't worry about
   the accuracy and completeness of my data.

3. I am really impressed by the community at [r/indianaviation][indianaviation]
   which has kind of got me into reading up more about aviation in general.

[disruptions]: https://en.wikipedia.org/wiki/2025_IndiGo_disruption
[diwali]: https://en.wikipedia.org/wiki/Diwali
[dash-8]: https://en.wikipedia.org/wiki/De_Havilland_Canada_Dash_8#Series_200
[indianaviation]: https://www.reddit.com/r/indianaviation/
[a320]: https://en.wikipedia.org/wiki/Airbus_A320_family
[737]: https://en.wikipedia.org/wiki/Boeing_737_MAX
