import { test } from "node:test";
import assert from "node:assert/strict";
import { nearToYocto, yoctoToNear } from "../src/units.js";

test("nearToYocto converts whole and fractional amounts", () => {
    assert.equal(nearToYocto("1"), "1000000000000000000000000");
    assert.equal(nearToYocto("0.2"), "200000000000000000000000");
});

test("yoctoToNear trims trailing zeros", () => {
    assert.equal(yoctoToNear("200000000000000000000000"), "0.2");
    assert.equal(yoctoToNear("1000000000000000000000000"), "1");
});

test("converting there and back gives the same amount", () => {
    for (const n of ["0.000001", "12.5", "3"]) assert.equal(yoctoToNear(nearToYocto(n)), n);
});

test("nearToYocto rejects a negative amount", () => {
    assert.throws(() => nearToYocto("-1"));
});