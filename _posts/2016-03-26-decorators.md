---
layout: single
title:  "Introduction to decorators in Python"
date:   2020-05-30 14:30:12 +0530
permalink: "/2016/03/introduction-to-decorators-in-python.html"
categories: jekyll update
---

## Introduction
Understanding decorators in Python is one of the most trickiest thing and creating one is one of the most craftiest thing in Python. It requires understanding of few functional programming concepts, how functions work, namespace/scope/lifetime of data items and most importantly closure.

## What is a decorator ?
A decorator is a design pattern which allows us to modify the functionality of a method or class without changing the implementation of the existing function to be decorated.

For beginners, hold on questions like:
* How is it different from calling a separately created function containing added functionality?
* What’s so cool about decorators?
* Is Bruce Wayne the Batman?
I hope these questions will get answered by the end of this post.

## Know your functions better
Functions are like any other variables in python i.e. we can pass functions as arguments and can return functions from a function as a return value. Why is it so ? Because functions are also objects in Python like everything else.

Consider this:

```python
>>> a = 10
>>> a.__class__
<type 'int'>
>>>
>>>
>>> '10'.__class__
<type 'str'>
>>>
>>>
>>>True.__class__
<type 'bool'>
>>>
>>>
>>>def batman():
...     pass
...
>>> batman.__class__
<type 'function'>
>>>
```

Now we know that functions are also objects.

## Namespace, scope and lifetime
A namespace, in simple terms, is the collection of names which we define in our code which are essentially the collection of objects (named). Therefore, there can be a number of namespaces existing independently. This independence is in terms of their scope and lifetime.

Functions create their own namespace and it is accessible directly only in the function definition. This is the scope of the namespace in a function. Similar is the case with any other code segment.

Variables in their local namespace in a function are destroyed when the function ends. This is the lifetime of the variables.

Rule: While accessing variables, Python looks for the variables in the local scope first and then in the enclosing scope.

## Nested functions
Python allows nesting of functions.

Example:

```python
def wrapper():
  wrapper_a = 10
  def inner():
    print wrapper_a
  return inner
wrapper()

""" 
Output:
10
"""
```

Here, the namespace scope rule is still valid. At line 4, the inner function looks for the variable in its local scope and then to the enclosing scope which is another function which has its own namespace/scope. Hence, the scope rule works here.

## Closures
Considering the above example code for nested functions again, it follows Python’s scoping rules. But it is weird in terms of lifetime of the namespace.

Code:

```python
def wrapper():
  wrapper_a = 10
  def inner():
    print wrapper_a
  return inner
wrapper()

"""
Output:
10
"""
```

In the above code, the inner function tries to access a variable of its enclosing scope after it has returned a value. Hence, according to Python’s namespace-lifetime rule, the code should not work as the inner function is trying to access namespace in the enclosing function which has ended by returning another function.
Here, the concept of function closure comes into play. A closure in Python is when an inner function (in non global scope) has the information of the namespace of the enclosing function at its definition.

## What is a decorator ? (finally)
As defined earlier, a decorator is a design pattern which allows us to modify the functionality of a method without changing the implementation of the existing function to be decorated.

A decorator provides a way for function + something more. It accepts a function as an argument and returns another function after decorating (modifying).

Example:

```python
# borrowed this example from http://thecodeship.com/patterns/guide-to-python-function-decorators/
def get_text(name):
   return "lorem ipsum, {0} dolor sit amet".format(name)

def p_decorate(func):
   def func_wrapper(name):
       return "<p>{0}</p>".format(func(name))
   return func_wrapper

my_get_text = p_decorate(get_text)

print my_get_text("Vipul")

# Output:
# <p>lorem ipsum, Vipul dolor sit amet</p>
```

Here, the `p_decorate` decorates the function `get_text` to enclose it in a `<p>` tag. The decorator function (`p_decorate`) accepts a function as an argument which can be any function (think deeper and you will understand how/why it is different from using a normal function call) and the inner function (`func_wrap`) calls the function in the parameter and modify the value returned.

Python gives us a cool syntactic sugar for using decorators which ensures better understanding and cleaner code. We can create a decorator as discussed above and plug it to any function using `@decorator_name`. For example for all the function to be decorated by the decorator `p_decorate`, we just need to put `@p_decorate` above the appropriate function definition.

Example:

```python
def p_decorate(func):
   def func_wrapper(name):
       return "<p>{0}</p>".format(func(name))
   return func_wrapper

@p_decorate
def get_text(name):
   return "lorem ipsum, {0} dolor sit amet".format(name)

print get_text("Vipul")
# Output:
# <p>lorem ipsum, Vipul dolor sit amet</p>
```

I would love to hear your feedback, any corrections or if you want more elaborate details please let me know.

> Batman: A hero can be anyone. Even a man doing something as simple and reassuring as putting a coat around a young boy’s shoulders to let him know that the world hadn’t ended.

> *[takes off in the Bat]*

> Jim Gordon: Bruce Wayne?
