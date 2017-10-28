Yenten Core is now available from:

  https://github.com/yenten/yenten

This is a new version release.

Upgrading and downgrading
==========================

How to Upgrade
--------------

Overwrite yentend, yenten-cli, or yenten-qt

If you are upgrading from version earlier, the first time you run
core your blockchain files will be re-indexed, which will take anywhere from 
30 minutes to several hours, depending on the speed of your machine.

Downgrading warnings
--------------------

Backup wallet.dat and clean install.

Core Release notes
=======================

RPC:
- Avoid a segfault on getblock if it can't read a block from disk
- Add paranoid return value checks in base58

Protocol and network code:
- Don't poll showmyip.com, it doesn't exist anymore
- Add a way to limit deserialized string lengths and use it
- Increase IsStandard() scriptSig length
- Avoid querying DNS seeds, if we have open connections
- Remove a useless millisleep in socket handler
- Stricter memory limits on CNode
- Better orphan transaction handling
- Add `-maxorphantx=<n>` and `-maxorphanblocks=<n>` options for control over the maximum orphan transactions and blocks

Wallet:
- Check redeemScript size does not exceed 520 byte limit
- Ignore (and warn about) too-long redeemScripts while loading wallet

GUI:
- fix 'opens in testnet mode when presented with a BIP-72 link with no fallback'
- AvailableCoins: acquire cs_main mutex
- Fix unicode character display on MacOSX

Miscellaneous:
- key.cpp: fail with a friendlier message on missing ssl EC support
- Remove bignum dependency for scripts
- Upgrade OpenSSL to 1.0.1k
- Upgrade miniupnpc to 2.0
- Fix boost detection in build system on some platforms

Credits
--------

Thanks to everyone who contributed to this release:

- Andrew Poelstra
- Cory Fields
- Gavin Andresen
- Jeff Garzik
- Johnathan Corgan
- Julian Haight
- Michael Ford
- Pavel Vasin
- Peter Todd
- phantomcircuit
- Pieter Wuille
- Rose Toomey
- Ruben Dario Ponticelli
- shshshsh
- Trevin Hofmann
- Warren Togami
- Wladimir J. van der Laan
- Zak Wilcox

As well as everyone that helped translating on [Transifex](https://www.transifex.com/projects/p/bitcoin/).
