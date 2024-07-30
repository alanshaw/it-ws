## [6.1.5](https://github.com/alanshaw/it-ws/compare/v6.1.4...v6.1.5) (2024-07-30)

### Bug Fixes

* allow addr to be `null` ([#119](https://github.com/alanshaw/it-ws/issues/119)) ([9881c23](https://github.com/alanshaw/it-ws/commit/9881c231fa8c7ae428fc732064e890b14cf8375f))

## [6.1.4](https://github.com/alanshaw/it-ws/compare/v6.1.3...v6.1.4) (2024-07-29)

### Bug Fixes

* handle null server address ([#118](https://github.com/alanshaw/it-ws/issues/118)) ([bb8e804](https://github.com/alanshaw/it-ws/commit/bb8e804b84ae0a3fd18d51a1edb677eb3be18c4e)), closes [#114](https://github.com/alanshaw/it-ws/issues/114)

## [6.1.3](https://github.com/alanshaw/it-ws/compare/v6.1.2...v6.1.3) (2024-07-24)

### Dependencies

* **dev:** bump aegir from 40.0.13 to 44.0.1 ([#117](https://github.com/alanshaw/it-ws/issues/117)) ([2fd31de](https://github.com/alanshaw/it-ws/commit/2fd31de1b58a3d97456f3e001c4c95d4a748899e))

## [6.1.2](https://github.com/alanshaw/it-ws/compare/v6.1.1...v6.1.2) (2024-07-22)


### Bug Fixes

* export web-socket ([#99](https://github.com/alanshaw/it-ws/issues/99)) ([9687a51](https://github.com/alanshaw/it-ws/commit/9687a514377724642818227912f264aa53578ee6))
* it-goodbye expects the source to be an async generator ([#115](https://github.com/alanshaw/it-ws/issues/115)) ([d00509c](https://github.com/alanshaw/it-ws/commit/d00509c616415ae02fe4bf36a172688afbdf9fe7))

## [6.1.1](https://github.com/alanshaw/it-ws/compare/v6.1.0...v6.1.1) (2023-12-11)


### Dependencies

* bump uint8arrays from 4.0.10 to 5.0.0 ([#96](https://github.com/alanshaw/it-ws/issues/96)) ([df1e824](https://github.com/alanshaw/it-ws/commit/df1e824e84b197f47c6ecbf943820cb6fe281388))

## [6.1.0](https://github.com/alanshaw/it-ws/compare/v6.0.5...v6.1.0) (2023-12-10)


### Features

* support react-native ([#97](https://github.com/alanshaw/it-ws/issues/97)) ([440af16](https://github.com/alanshaw/it-ws/commit/440af169944d9c703757d548522c25cc4c9502ac))


### Trivial Changes

* add or force update .github/workflows/js-test-and-release.yml ([#77](https://github.com/alanshaw/it-ws/issues/77)) ([96f4c7b](https://github.com/alanshaw/it-ws/commit/96f4c7b032123a23a94a54da8b74251c1db3b3ee))
* delete templates [skip ci] ([#76](https://github.com/alanshaw/it-ws/issues/76)) ([e8b6c1f](https://github.com/alanshaw/it-ws/commit/e8b6c1f4dc9cfb86afe007bd4c0ae3a1b40393e5))

## [6.0.5](https://github.com/alanshaw/it-ws/compare/v6.0.4...v6.0.5) (2023-08-10)


### Dependencies

* add @types/ws to dependencies to ensure types for the version of ws are compatible ([#71](https://github.com/alanshaw/it-ws/issues/71)) ([80092e8](https://github.com/alanshaw/it-ws/commit/80092e805c3ba3e2edd67191be5c6f07446d9cfb))

## [6.0.4](https://github.com/alanshaw/it-ws/compare/v6.0.3...v6.0.4) (2023-08-10)


### Dependencies

* **dev:** bump delay from 5.0.0 to 6.0.0 ([#69](https://github.com/alanshaw/it-ws/issues/69)) ([a5b1437](https://github.com/alanshaw/it-ws/commit/a5b14377053c2ba14a1c3611c989e9191920afda))

## [6.0.3](https://github.com/alanshaw/it-ws/compare/v6.0.2...v6.0.3) (2023-08-10)


### Dependencies

* **dev:** bump aegir from 38.1.8 to 40.0.0 ([#74](https://github.com/alanshaw/it-ws/issues/74)) ([7749816](https://github.com/alanshaw/it-ws/commit/774981645ff0491450068f5d0deb4f7b8d4fb887))

## [6.0.2](https://github.com/alanshaw/it-ws/compare/v6.0.1...v6.0.2) (2023-08-10)


### Bug Fixes

* only send data if the socket is open ([#75](https://github.com/alanshaw/it-ws/issues/75)) ([f63265e](https://github.com/alanshaw/it-ws/commit/f63265e17b8ee979fd2471b9cec0f8e98d0b5fd0))

## [6.0.1](https://github.com/alanshaw/it-ws/compare/v6.0.0...v6.0.1) (2023-04-18)


### Bug Fixes

* update server.js import override ([#62](https://github.com/alanshaw/it-ws/issues/62)) ([150e7a2](https://github.com/alanshaw/it-ws/commit/150e7a2e77f3206fc19521dc67d400f00b3d6483)), closes [#20](https://github.com/alanshaw/it-ws/issues/20)

## [6.0.0](https://github.com/alanshaw/it-ws/compare/v5.0.6...v6.0.0) (2023-04-18)


### ⚠ BREAKING CHANGES

* the type of the source/sink properties have changed

### Bug Fixes

* fix ci script ([af5c774](https://github.com/alanshaw/it-ws/commit/af5c7745f68912debcf04bb6a7214fac1b9834b5))


### Dependencies

* update stream types ([#61](https://github.com/alanshaw/it-ws/issues/61)) ([4b4ad84](https://github.com/alanshaw/it-ws/commit/4b4ad845f1e0615ff2cff603676c87578046bffe))

## [5.0.6](https://github.com/alanshaw/it-ws/compare/v5.0.5...v5.0.6) (2022-12-08)


### Bug Fixes

* catch listen error ([#34](https://github.com/alanshaw/it-ws/issues/34)) ([7a96e45](https://github.com/alanshaw/it-ws/commit/7a96e45ff0c15c51c8901c491e318b44e38226cf))

## [5.0.5](https://github.com/alanshaw/it-ws/compare/v5.0.4...v5.0.5) (2022-12-07)


### Dependencies

* update it-drain, it-ndjson and it-foreach ([#35](https://github.com/alanshaw/it-ws/issues/35)) ([5c65441](https://github.com/alanshaw/it-ws/commit/5c65441e2cd718b5338d9bc570091d4897e1e5e1))

## [5.0.4](https://github.com/alanshaw/it-ws/compare/v5.0.3...v5.0.4) (2022-12-07)


### Dependencies

* **dev:** bump it-all from 1.0.6 to 2.0.0 ([#27](https://github.com/alanshaw/it-ws/issues/27)) ([003752d](https://github.com/alanshaw/it-ws/commit/003752de90da52d27624f16d4d7f06d48f217539))
* **dev:** bump it-map from 1.0.6 to 2.0.0 ([#28](https://github.com/alanshaw/it-ws/issues/28)) ([8cde19c](https://github.com/alanshaw/it-ws/commit/8cde19c59342c39d325c80dc5c54fae469065d4a))

## [5.0.3](https://github.com/alanshaw/it-ws/compare/v5.0.2...v5.0.3) (2022-10-13)


### Bug Fixes

* add matching export ([#21](https://github.com/alanshaw/it-ws/issues/21)) ([113deaf](https://github.com/alanshaw/it-ws/commit/113deaf61121fc0330a7f559a3346cd54746bc07))


### Trivial Changes

* update project config ([#25](https://github.com/alanshaw/it-ws/issues/25)) ([fbb05d0](https://github.com/alanshaw/it-ws/commit/fbb05d0401c4ba021b82f6ec3940a191ffb84a2c))


### Dependencies

* bump uint8arrays from 3.1.1 to 4.0.2 ([#26](https://github.com/alanshaw/it-ws/issues/26)) ([3dea637](https://github.com/alanshaw/it-ws/commit/3dea637fde422091839b00093b9084ee63b0d25b))
* **dev:** bump wherearewe from 1.0.2 to 2.0.1 ([#22](https://github.com/alanshaw/it-ws/issues/22)) ([8a3635a](https://github.com/alanshaw/it-ws/commit/8a3635a5d229c23882a463b1db95a28a714db762))

### [5.0.2](https://github.com/alanshaw/it-ws/compare/v5.0.1...v5.0.2) (2022-05-20)


### Bug Fixes

* emit error events on returned server ([#16](https://github.com/alanshaw/it-ws/issues/16)) ([c8b846e](https://github.com/alanshaw/it-ws/commit/c8b846ee44a8321a0c080b039a05e975162c8db5))
* fix typos in npm scripts ([#17](https://github.com/alanshaw/it-ws/issues/17)) ([431becc](https://github.com/alanshaw/it-ws/commit/431becc2c9bc4d28df750e16db1d37241d21555d))

### [5.0.1](https://github.com/alanshaw/it-ws/compare/v5.0.0...v5.0.1) (2022-03-04)


### Bug Fixes

* only close duplex if open ([#8](https://github.com/alanshaw/it-ws/issues/8)) ([cccd319](https://github.com/alanshaw/it-ws/commit/cccd319cab6eca96ef6b26cba24fc423941d4f31))

## [5.0.0](https://github.com/alanshaw/it-ws/compare/v4.0.0...v5.0.0) (2022-01-29)


### ⚠ BREAKING CHANGES

* switch to named exports, ESM only

### Features

* convert to typescript ([#6](https://github.com/alanshaw/it-ws/issues/6)) ([02110ae](https://github.com/alanshaw/it-ws/commit/02110aea661b83cde311eb2ce28c8a3da5c0e2a0))
