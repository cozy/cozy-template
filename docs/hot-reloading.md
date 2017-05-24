# Hot reloading

1. You need to use the HOT_RELOAD environment variable (any value).

2. You have to disable CSP since the app will be served by the cozy-stack which sends secure CSP headers.

The extension works for Chrome
[Disable Content Security](https://chrome.google.com/webstore/detail/disable-content-security/ieelmcmcagommplceebfedjlakkhpden). Be aware of the security risks this entails.

3. You need to render the index.html that the stack serves so that it uses the right public path :

```env HOT_RELOAD=1 yarn run watch:browser```

And __stop it__ when it has built the files once.

4. Then you can launch `webpack-dev-server`

```env HOT_RELOAD=1 npm run watch:browser:standalone```

And you can now visit your app via cozy-stack.

## Known issues

1. It does not work with CSS modules
2. It hot-reloads the app completely, not the individuals components, and state is lost :(
