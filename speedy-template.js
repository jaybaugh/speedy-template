/***********************************************

The MIT License (MIT)

Copyright (c) 2013 Jay Baugh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

************************************************

Super fast micro templating function.

This is an improved version of John Resig's micro-templating function
which increases speed dramatically by using string concatenation instead 
of an array join.

Check out the speed comparisons (~700% faster):
http://jsperf.com/push-vs-string-concatenation/2

// Example usage:

// First create a template string:
var template = "Mary had a <#=data.size#> lamb with very <#=data.shape#> teeth.";

// Create template function:
var templateFunction = speedyTemplate(template);

// Use template function:
console.info("Result:", templateFunction({"size":"huge", "shape":"pointy"}));

***********************************************/

function speedyTemplate(template) {
                
	var strFunc = "return ('" +

	template.replace(/[\r\t\n]/g, " ")
			.replace(/'(?=[^#]*#>)/g, "\t")
			.split("'").join("\\'")
			.split("\t").join("'")
			.replace(/<#=(.+?)#>/g, "' + $1 + '")
			.split("<#").join("');")
			.split("#>").join("p.push('")
			+ "');";

	return new Function("data", strFunc);
}

