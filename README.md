# Minecraft recode in TypeScript

A port of Minecraft Beta 1.2_02 to TypeScript.

### Notable Differences
**File IO**

Web browsers don't have as much access to the filesystem as Java applets once did, which means there's no way to interact with the original `%AppData%/.minecraft` folder. Instead, files are stored in the Origin Persisted File System, including saves, configuration, cached sounds, and the minecraft.jar.

**Multiplayer**

Web browsers can't send UDP packets, instead websockets are used. This does make this client incompatible with vanilla servers, but a plugin will be developed to facilitate this.

**Renderer & Input**

We can't use LWJGL in the browser, so input and rendering is very different. Three.JS is being used instead.

**Audio**

Instead of using Paulscode, Three.js is also used for audio.

<hr>

### Licensing
- The main rendering library is [three.js](https://github.com/mrdoob/three.js/)
- 64 bits number implementation by [long.js](https://github.com/dcodeIO/long.js)
- AES encryption implemented by [aes-js](https://github.com/ricmoo/aes-js)
- BigInt extension for RSA encryption by [bigint-mod-arith](https://github.com/juanelas/bigint-mod-arith)
- Public key parser implemented by [asn1-parser.js](https://git.coolaj86.com/coolaj86/asn1-parser.js)
- Minecraft chat component parser by [mc-chat-format](https://github.com/janispritzkau/mc-chat-format)
- All used sound resources are taken from [freesounds.org](https://freesound.org/people/C418/downloaded_sounds/?page=8#sound)
<hr>

NOT OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG.
