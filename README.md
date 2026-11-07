# mission-dao-demo

A tiny unit-conversion library used as the live demo repo for **Mission DAO**: an AI agent that rewards valid merged pull requests with testnet NEAR (at most 2 per contributor in a review window; trivial changes earn nothing).

## Usage

```js
import { nearToYocto, yoctoToNear } from "./src/units.js";
nearToYocto("0.2"); // "200000000000000000000000"
```

## Contributing

1. Open a pull request.
2. End the PR description with your NEAR testnet account on its own line:

   ```
   near: yourname.testnet
   ```

3. When a maintainer merges it, the Mission DAO agent reviews it and, if it qualifies, pays you in testnet NEAR and labels the PR as paid.
