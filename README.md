# react-native-roots
```
<View>
  <App />         <---- original app
  <YourView1 />   <---- your view
  <YourView2 />   <---- your view
  <YourView3 />   <---- your view
  ...
</View>
```


# Usage
```js
import Roots from 'react-native-roots';

// add root view
Roots.add('loading', (
  <View style={styles.container}>
    <View style={styles.mask}>
      <ActivityIndicator
        animating
        size="small"
        color="#fff"
      />
    </View>
  </View>
));

// remove root view
Roots.remove('loading');
```

# API
## add(key, element)
add root view

## remove(key)
remove root view
