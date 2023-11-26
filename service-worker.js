/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "5da24d2c84a48922d2b4c4f6762711a1"
  },
  {
    "url": "assets/css/0.styles.b9d28807.css",
    "revision": "3a58d7d0e3c058822c9e21f3f2fe4a6c"
  },
  {
    "url": "assets/img/delete-1.f85ff1da.png",
    "revision": "f85ff1dabcc11dd0327ea02bf3a338b8"
  },
  {
    "url": "assets/img/delete-2.b827be81.png",
    "revision": "b827be813f99ed6d9bcf37222b365641"
  },
  {
    "url": "assets/img/delete.83e9be11.png",
    "revision": "83e9be1116459dc2e138a6e52b1d6798"
  },
  {
    "url": "assets/img/ex-feedback.2fa9809b.png",
    "revision": "2fa9809b7781d4d145ce398d20abfe4b"
  },
  {
    "url": "assets/img/ex-request.d4727732.png",
    "revision": "d4727732fda9da04214eca6d97dceb84"
  },
  {
    "url": "assets/img/ex-user.5b09de3b.png",
    "revision": "5b09de3be4718636c3b8de266066b8a9"
  },
  {
    "url": "assets/img/get-1.bc613511.png",
    "revision": "bc613511af621373faec86b3e280ef92"
  },
  {
    "url": "assets/img/get-2.48afcc6a.png",
    "revision": "48afcc6a12721330c0d7de1986ce51bb"
  },
  {
    "url": "assets/img/get.b0f22489.png",
    "revision": "b0f2248908a1d10597f6749dc5afb122"
  },
  {
    "url": "assets/img/patch-1.fd5ba955.png",
    "revision": "fd5ba9555734eeced004a596685e1507"
  },
  {
    "url": "assets/img/patch-2.f41e359f.png",
    "revision": "f41e359f57e6b564aaa18736075c722a"
  },
  {
    "url": "assets/img/patch.fb70e451.png",
    "revision": "fb70e4514c56be0be372d310e26fde66"
  },
  {
    "url": "assets/img/post-1.69167461.png",
    "revision": "691674617795137a1ec1417876b35420"
  },
  {
    "url": "assets/img/post-2.610ee44d.png",
    "revision": "610ee44d37eb9ea7f4a2b970f7440517"
  },
  {
    "url": "assets/img/post.99976be4.png",
    "revision": "99976be40c53fcada2ec764d95ce340a"
  },
  {
    "url": "assets/img/relationalSchema.3a2a4fde.png",
    "revision": "3a2a4fdeff9e9713d6425c71e25a45b3"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/start.2409f4f6.png",
    "revision": "2409f4f6bee3ccfbd2486567081e9d77"
  },
  {
    "url": "assets/js/1.c9dec183.js",
    "revision": "3e7af17b61937a1681b449e865adbfd7"
  },
  {
    "url": "assets/js/10.d1c2ab6f.js",
    "revision": "bb351805716b73afb4c517421ce90fc2"
  },
  {
    "url": "assets/js/13.13da8309.js",
    "revision": "5c7a4e083be62a5e374980bfd4281091"
  },
  {
    "url": "assets/js/14.057cf402.js",
    "revision": "7752f88a6ae3057011fc366e78e50506"
  },
  {
    "url": "assets/js/15.51dc31d9.js",
    "revision": "677281e9f92e7457abc40bb64aa78087"
  },
  {
    "url": "assets/js/16.2229d997.js",
    "revision": "7391396af24081b12de4d36104926921"
  },
  {
    "url": "assets/js/17.fe53d6a4.js",
    "revision": "c4246b40bcd22576171c89acc563dd98"
  },
  {
    "url": "assets/js/18.32390c81.js",
    "revision": "9e72f76e42e11e044d1958dbde276e1c"
  },
  {
    "url": "assets/js/19.8c754082.js",
    "revision": "f797469cb34c455621fb42eaca5e3546"
  },
  {
    "url": "assets/js/2.71a34163.js",
    "revision": "e18db574d527b9a3251de285f769a048"
  },
  {
    "url": "assets/js/20.b00e23c1.js",
    "revision": "0b967fb75bc41da44ea10c7f2925ca95"
  },
  {
    "url": "assets/js/21.f7952f62.js",
    "revision": "27d34ed4df8d8c7ef7b291a6a0ab35c8"
  },
  {
    "url": "assets/js/22.9509855c.js",
    "revision": "670a8531dba75d2f13066ef07a16915f"
  },
  {
    "url": "assets/js/23.5a0f4a31.js",
    "revision": "cf2741e2a90ed09c178bcd4f6f96bb08"
  },
  {
    "url": "assets/js/24.344101b2.js",
    "revision": "49d81031cf28220cb574a52550899df9"
  },
  {
    "url": "assets/js/25.c6e5e569.js",
    "revision": "3a29185d2b236fae7fb3aeb39adc4f65"
  },
  {
    "url": "assets/js/26.6d50efb5.js",
    "revision": "1d08b73f746bcc2251dcaa5c679b57e6"
  },
  {
    "url": "assets/js/27.6d59094a.js",
    "revision": "1e91e22f00911613d9d2dbb2817a7397"
  },
  {
    "url": "assets/js/28.b43d40d2.js",
    "revision": "f09141eca46bbd96b2e7cce4081fb882"
  },
  {
    "url": "assets/js/29.dd7303a1.js",
    "revision": "71324bb6ccc106daa206855a3f740995"
  },
  {
    "url": "assets/js/3.d7db55ae.js",
    "revision": "10f31f23ef8a9518a159d0af12392fb4"
  },
  {
    "url": "assets/js/30.9fcc299a.js",
    "revision": "51400ae22cf58cecdedaf8ef092c4418"
  },
  {
    "url": "assets/js/31.8dcc13a0.js",
    "revision": "299ecdacc032876ed92998dfcd73a438"
  },
  {
    "url": "assets/js/32.aac59858.js",
    "revision": "2ed778406b207fb155d0da68efadbc92"
  },
  {
    "url": "assets/js/33.13b76b5f.js",
    "revision": "1390b4aa351091deba815d8482913017"
  },
  {
    "url": "assets/js/34.e292344f.js",
    "revision": "5f1b4a17af9f29016df70ff54790e7a1"
  },
  {
    "url": "assets/js/35.ddd0ff76.js",
    "revision": "ee4853205d5985dd88cfa3899a3d1668"
  },
  {
    "url": "assets/js/36.3b27a527.js",
    "revision": "3dbc4606ca633e78097390c66d18fb78"
  },
  {
    "url": "assets/js/37.a11083fc.js",
    "revision": "c91c987f0d2dfc8e159552d5ec6cc86f"
  },
  {
    "url": "assets/js/38.4d637d2d.js",
    "revision": "cde37e7fa6789630f204ea945974e5d2"
  },
  {
    "url": "assets/js/39.8d158f68.js",
    "revision": "67228ad1cebab92a62941721f23af170"
  },
  {
    "url": "assets/js/4.ebbb7b32.js",
    "revision": "e70d89383a7b48072754a93d70ccfa30"
  },
  {
    "url": "assets/js/41.e195d4a4.js",
    "revision": "818903a05f1c64a9f9571cff5473b1f6"
  },
  {
    "url": "assets/js/5.c6cd08f1.js",
    "revision": "f7f490e1d5274ea138b58a220624e7cd"
  },
  {
    "url": "assets/js/6.10307d2b.js",
    "revision": "9d6afa20a8027d62b03cc3912b3bb583"
  },
  {
    "url": "assets/js/7.573a0d89.js",
    "revision": "da14f4cb200486263bd62d6ba8222326"
  },
  {
    "url": "assets/js/8.1d91e211.js",
    "revision": "beb876a67c4f2ad092a5173dbe7e56b6"
  },
  {
    "url": "assets/js/9.7f187ff9.js",
    "revision": "c8b4c308d0fc50818b8920ce505881a9"
  },
  {
    "url": "assets/js/app.4e558b59.js",
    "revision": "de88b7e6cb3206645319889299e1b82e"
  },
  {
    "url": "assets/js/vendors~docsearch.0d1e900e.js",
    "revision": "f32567f7f6dc3aea2c28803554263b53"
  },
  {
    "url": "conclusion/index.html",
    "revision": "ca97001446ebabfa050f28fac9326fec"
  },
  {
    "url": "design/index.html",
    "revision": "7280a70741ee79ab1e934ccd94c9b1ab"
  },
  {
    "url": "index.html",
    "revision": "611f10eb04c6e0a65479e2f5fb6c9a8f"
  },
  {
    "url": "intro/index.html",
    "revision": "9fabaa79f3183c87cf85221579e91d2b"
  },
  {
    "url": "license.html",
    "revision": "c6ae94487788630ac26fdec72cecb7f2"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "requirements/index.html",
    "revision": "d1a42c4ad07121499940f1517282c359"
  },
  {
    "url": "requirements/stakeholders-needs.html",
    "revision": "2395e80f1e702779a63b2eb2a4d422df"
  },
  {
    "url": "requirements/state-of-the-art.html",
    "revision": "f9ae0c0ca263dc8f30d988fafa1389d2"
  },
  {
    "url": "software/index.html",
    "revision": "4d61b10f00bcfaa0623dbf18e342dbd2"
  },
  {
    "url": "test/index.html",
    "revision": "c14ddcf8ac2e21685a109652f50db116"
  },
  {
    "url": "use cases/index.html",
    "revision": "c6985b768efbc51f4e886d0328ba39b5"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
