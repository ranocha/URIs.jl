var documenterSearchIndex = {"docs":
[{"location":"#URIs.jl","page":"Home","title":"URIs.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"URIs is a Julia package for parsing and working with Uniform Resource Identifiers, as defined in RFC 3986.","category":"page"},{"location":"#Tutorial","page":"Home","title":"Tutorial","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"DocTestSetup = quote\n    using URIs\nend","category":"page"},{"location":"","page":"Home","title":"Home","text":"Parsing URIs from a string can be done with the URI constructor:","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> u = URI(\"http://example.com/some/path\")\nURI(\"http://example.com/some/path\")","category":"page"},{"location":"","page":"Home","title":"Home","text":"The components of the URI can then be accessed via the fields scheme, userinfo, host, port, path, query or fragment:","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> u = URI(\"http://example.com/some/path\")\nURI(\"http://example.com/some/path\")\n\njulia> u.scheme\n\"http\"\n\njulia> u.host\n\"example.com\"\n\njulia> u.path\n\"/some/path\"","category":"page"},{"location":"","page":"Home","title":"Home","text":"To access the query part of a URI as a dictionary, the queryparams function is provided:","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> u = URI(\"http://example.com/path?x=1&y=hi\")\nURI(\"http://example.com/path?x=1&y=hi\")\n\njulia> queryparams(u)\nDict{String,String} with 2 entries:\n  \"x\" => \"1\"\n  \"y\" => \"hi\"","category":"page"},{"location":"#Reference","page":"Home","title":"Reference","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"URI\nqueryparams\nqueryparampairs\nabsuri\nescapeuri\nunescapeuri\nescapepath\nresolvereference\nURIs.splitpath\nBase.isvalid(::URI)","category":"page"},{"location":"#URIs.URI","page":"Home","title":"URIs.URI","text":"URI(; scheme=\"\", host=\"\", port=\"\", etc...)\nURI(str) = parse(URI, str::String)\n\nA type representing a URI (e.g. a URL). Can be constructed from distinct parts using the various supported keyword arguments, or from a string. The URI constructors will automatically escape any provided query arguments, typically provided as \"key\"=>\"value\"::Pair or Dict(\"key\"=>\"value\"). Note that multiple values for a single query key can provided like Dict(\"key\"=>[\"value1\", \"value2\"]).\n\nWhen constructing a URI from a String, you need to first unescape that string: URI( URIs.unescapeuri(str) ).\n\nThe URI struct stores the complete URI in the uri::String field and the component parts in the following SubString fields:\n\nscheme, e.g. \"http\" or \"https\"\nuserinfo, e.g. \"username:password\"\nhost e.g. \"julialang.org\"\nport e.g. \"80\" or \"\"\npath e.g \"/\"\nquery e.g. \"Foo=1&Bar=2\"\nfragment\n\nThe queryparams(::URI) function returns a Dict containing the query.\n\n\n\n\n\n","category":"type"},{"location":"#URIs.queryparams","page":"Home","title":"URIs.queryparams","text":"queryparams(::URI) -> Dict\nqueryparams(query_str::AbstractString) -> Dict\n\nReturns a Dict containing the query parameter string parsed according to the key=value pair formatting convention.\n\nNote that duplicate query param values are not supported; if needed, use queryparampairs.\n\nNote that this is not part of the formal URI grammar, merely a common parsing convention — see RFC 3986.\n\n\n\n\n\n","category":"function"},{"location":"#URIs.queryparampairs","page":"Home","title":"URIs.queryparampairs","text":"queryparampairs(::URI) -> Vector{Pair{String, String}}\nqueryparampairs(query_str::AbstractString) -> Vector{Pair{String, String}}\n\nIdentical to queryparams, but returns a Vector{Pair{String, String}} containing the query parameter string parsed according to the key=value pair formatting convention.\n\nNote that this is not part of the formal URI grammar, merely a common parsing convention — see RFC 3986.\n\n\n\n\n\n","category":"function"},{"location":"#URIs.absuri","page":"Home","title":"URIs.absuri","text":"absuri(uri::Union{URI,AbstractString}, context::Union{URI,AbstractString}) -> URI\n\nConstruct an absolute URI, using uri.path and uri.query and filling in other components from context.\n\n\n\n\n\n","category":"function"},{"location":"#URIs.escapeuri","page":"Home","title":"URIs.escapeuri","text":"escapeuri(x)\n\nApply URI percent-encoding to escape special characters in x.\n\n\n\n\n\n","category":"function"},{"location":"#URIs.unescapeuri","page":"Home","title":"URIs.unescapeuri","text":"unescapeuri(str)\n\nPercent-decode a string according to the URI escaping rules.\n\n\n\n\n\n","category":"function"},{"location":"#URIs.escapepath","page":"Home","title":"URIs.escapepath","text":"escapepath(path)\n\nEscape the path portion of a URI, given the string path containing embedded / characters which separate the path segments.\n\n\n\n\n\n","category":"function"},{"location":"#URIs.resolvereference","page":"Home","title":"URIs.resolvereference","text":"resolvereference(base::Union{URI,AbstractString}, ref::Union{URI,AbstractString}) -> URI\n\nResolve a URI reference ref relative to the absolute base URI base, complying with RFC 3986 Section 5.2.\n\nIf ref is an absolute URI, return ref unchanged.\n\nExamples\n\njulia> u = resolvereference(\"http://example.org/foo/bar/\", \"/baz/\")\nURI(\"http://example.org/baz/\")\n\njulia> resolvereference(u, \"./hello/world\")\nURI(\"http://example.org/baz/hello/world\")\n\njulia> resolvereference(u, \"http://localhost:8000\")\nURI(\"http://localhost:8000\")\n\n\n\n\n\n","category":"function"},{"location":"#URIs.splitpath","page":"Home","title":"URIs.splitpath","text":"URIs.splitpath(path|uri; rstrip_empty_segment=true)\n\nSplits the path into component segments based on /, according to http://tools.ietf.org/html/rfc3986#section-3.3. Any fragment and query parts of the string are ignored if present.\n\nA final empty path segment (trailing '/') is removed, if present. This is technically incompatible with the segment grammar of RFC3986, but it seems to be a common recommendation to make paths with and without a trailing slash equivalent. To preserve any final empty path segment, set rstrip_empty_segment=false.\n\nExamples\n\njulia> URIs.splitpath(URI(\"http://example.com/foo/bar?a=b&c=d\"))\n2-element Array{String,1}:\n \"foo\"\n \"bar\"\n\njulia> URIs.splitpath(\"/foo/bar/\")\n2-element Array{String,1}:\n \"foo\"\n \"bar\"\n\n\n\n\n\n","category":"function"},{"location":"#Base.isvalid-Tuple{URI}","page":"Home","title":"Base.isvalid","text":"checks if a URI is valid\n\n\n\n\n\n","category":"method"}]
}
