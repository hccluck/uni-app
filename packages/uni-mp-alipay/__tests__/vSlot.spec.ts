import { assert } from './testUtils'

describe('mp-alipay: transform v-slot', () => {
  test('default slot', () => {
    assert(
      `<custom><template v-slot/></custom>`,
      `<custom v-i="2a9ec0b0-0" onVI="__l"><view/></custom>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<custom>test</custom>`,
      `<custom v-i="2a9ec0b0-0" onVI="__l">test</custom>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('named slots', () => {
    assert(
      `<custom><template v-slot:header/><template v-slot:default/><template v-slot:footer/></custom>`,
      `<custom v-i="2a9ec0b0-0" onVI="__l"><view slot="header"/><view slot="default"/><view slot="footer"/></custom>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<unicloud-db v-slot:default="{data, loading, error, options}" collection=""><view v-if="error">{{error.message}}</view><view v-else></view></unicloud-db>`,
      `<unicloud-db slot="default" collection="" v-i="2a9ec0b0-0" onVI="__l"><view a:for="{{a}}" a:for-item="v0" a:key="c" slot="{{v0.d}}"><view a:if="{{v0.a}}">{{v0.b}}</view><view a:else></view></view></unicloud-db>`,
      `(_ctx, _cache) => {
  return { a: _w(({ data, loading, error, options }, s0, i0) => { return _e({ a: error }, error ? { b: _t(error.message) } : {}, { c: s0, d: i0 }); }, { name: 'default', vueId: '2a9ec0b0-0' }) }
}`
    )
  })

  test('scoped slots', () => {
    assert(
      `<custom><template v-slot:default="slotProps"><view>{{ slotProps.item }}</view></template></custom>`,
      `<custom v-i="2a9ec0b0-0" onVI="__l"><view slot="default"><view a:for="{{a}}" a:for-item="slotProps" a:key="b" slot="{{slotProps.c}}"><view>{{slotProps.a}}</view></view></view></custom>`,
      `(_ctx, _cache) => {
  return { a: _w((slotProps, s0, i0) => { return { a: _t(slotProps.item), b: s0, c: i0 }; }, { name: 'default', vueId: '2a9ec0b0-0' }) }
}`
    )
  })

  test('scoped slots + scoped slots', () => {
    assert(
      `<custom><template v-slot:default="slotProps"><custom1><template v-slot:default="slotProps1">{{ slotProps.item }}{{ slotProps1.item }}</template></custom1></template></custom>`,
      `<custom v-i="2a9ec0b0-0" onVI="__l"><view slot="default"><view a:for="{{a}}" a:for-item="slotProps" a:key="d" slot="{{slotProps.e}}"><custom1 v-i="{{slotProps.c}}" onVI="__l"><view slot="default"><view a:for="{{slotProps.a}}" a:for-item="slotProps1" a:key="b" slot="{{slotProps1.c}}">{{slotProps.b}}{{slotProps1.a}}</view></view></custom1></view></view></custom>`,
      `(_ctx, _cache) => {
  return { a: _w((slotProps, s0, i0) => { return { a: _w((slotProps1, s1, i1) => { return { a: _t(slotProps1.item), b: s1, c: i1 }; }, { name: 'default', vueId: '2a9ec0b0-1' + '-' + i0 + ',' + '2a9ec0b0-0' }), b: _t(slotProps.item), c: '2a9ec0b0-1' + '-' + i0 + ',' + '2a9ec0b0-0', d: s0, e: i0 }; }, { name: 'default', vueId: '2a9ec0b0-0' }) }
}`
    )
  })

  test('v-if + scoped slots', () => {
    assert(
      `<custom><template v-if="ok" v-slot:default="slotProps"><view>{{ slotProps.item }}</view></template></custom>`,
      `<custom v-i="2a9ec0b0-0" onVI="__l"><view a:if="{{a}}" slot="default"><view a:for="{{b}}" a:for-item="slotProps" a:key="b" slot="{{slotProps.c}}"><view>{{slotProps.a}}</view></view></view></custom>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok }, _ctx.ok ? { b: _w((slotProps, s0, i0) => { return { a: _t(slotProps.item), b: s0, c: i0 }; }, { name: 'default', vueId: '2a9ec0b0-0' }) } : {})
}`
    )
  })

  test('v-for + scoped slots', () => {
    assert(
      `<custom v-for="item in items"><template v-slot:default="slotProps"><view>{{ slotProps.item }}</view></template></custom>`,
      `<custom a:for="{{a}}" a:for-item="item" v-i="{{item.b}}" onVI="__l"><view slot="default"><view a:for="{{item.a}}" a:for-item="slotProps" a:key="b" slot="{{slotProps.c}}"><view>{{slotProps.a}}</view></view></view></custom>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: _w((slotProps, s1, i1) => { return { a: _t(slotProps.item), b: s1, c: i1 }; }, { name: 'default', vueId: '2a9ec0b0-0' + '-' + i0 }), b: '2a9ec0b0-0' + '-' + i0 }; }) }
}`
    )
  })

  test('v-for + v-for + scoped slots', () => {
    assert(
      `<view v-for="item in items"><custom v-for="item1 in item.list" :item="item1"><template v-slot:default="slotProps"><view>{{ slotProps.item }}</view></template></custom></view>`,
      `<view a:for="{{a}}" a:for-item="item"><custom a:for="{{item.a}}" a:for-item="item1" item="{{item1.b}}" v-i="{{item1.c}}" onVI="__l"><view slot="default"><view a:for="{{item1.a}}" a:for-item="slotProps" a:key="b" slot="{{slotProps.c}}"><view>{{slotProps.a}}</view></view></view></custom></view>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: _f(item.list, (item1, k1, i1) => { return { a: _w((slotProps, s2, i2) => { return { a: _t(slotProps.item), b: s2, c: i2 }; }, { name: 'default', vueId: '2a9ec0b0-0' + '-' + i0 + '-' + i1 }), b: item1, c: '2a9ec0b0-0' + '-' + i0 + '-' + i1 }; }) }; }) }
}`
    )
  })
  test('old syntax', () => {
    assert(
      `<template slot="left"/>`,
      `<view slot="left"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
})
