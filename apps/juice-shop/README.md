# Juice Shop

## Running

```sh
nx start juice-shop
```

## XSS

```sh
// Place this in search bar
<iframe src="javascript:alert(`xss`)">
```

Alternatively via <http://localhost:3000/#/search?q=%3Ciframe%20src%3D%22javascript:alert(%60xss%60)%22%3E>

## SQL Injection

Place ' in login to terminate the string. No Prepared statements used.

## Miscellaneous

- Privacy policy at <http://localhost:3000/#/privacy-security/privacy-policy>
- Scoreboard at <http://localhost:3000/#/score-board>
- Administration at <http://localhost:3000/#/administration> (see jwt.js to get access)
