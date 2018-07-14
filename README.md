# MobileKit
## build
initial: 
```npm i```

build lib:
```ng build umobilekit```

publish lib:  
increment version number in package.json
```
ng build umobilekit --prod
cd dist/umobilekit
npm publish
```
## create new components in library:
```ng g c Scroller --project=umobilekit```  
Don't forget to add the newly generated component in the ```exports``` section of the lib's ```umobilekit.module```

// TODO: Touch handling: 0 - 100%: 
// - when state manual: attach ontouchmove and ontouchend, detach on touchend
// - on touch move: touchend x > 50%: animate open else animate closed
// TODO: Flinging: 45% - 100%: 55% route, veloyity down to 0
// TODO: Haptic feedback when opening drawer