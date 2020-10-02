---
title: "Using Protocol Buffer's Struct Well Known Type in C++"
permalink: "/random/struct-protocol-buffers-cpp/"
excerpt: "How to use Protocol Buffer's Struct well known type?"
author_profile: true
date: 2020-08-05T12:27:00+00:00
---

> `Struct` represents a structured data value, consisting of fields which map to
> dynamically typed values. In some languages, `Struct` might be supported by a
> native representation. For example, in scripting languages like JS a struct is
> represented as an object. The details of that representation are described
> together with the proto support for the language.

`Struct` type documentation at: [https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#struct][0]

Example proto file:
```proto
import "google/protobuf/struct.proto";

message Config {
  google.protobuf.Struct metadata = 1;
}
```

C++ implementation:
```cpp
::google::protobuf::Value value;
value.set_string_value("value");

auto fields = config->mutable_metadata()->mutable_fields();

(*fields)["key"] = value;
```


[0]: https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#struct
