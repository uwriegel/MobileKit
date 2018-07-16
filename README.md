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

// TODO: Haptic feedback when opening drawer
// TODO: Scroller in drawer not scrolling
// TODO: left click when opened again: supress
// TODO: Opened Drawer must be moved by touch
// TODO: Always correct History
// TODO: Open not on 50% but 0n 35%