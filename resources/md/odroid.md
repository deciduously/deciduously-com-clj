# Gentoo Linux on an ODROID C2
## a.k.a staring slackjawed at GCC output
### Setting the stage
Right after release, I treated myself to an [RPi 3 Model B](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/) to use a NAS.  I put Arch Linux ARM on it and had it configured in a day or so, and it ran faithflly until one day its frail little microUSB port for power snapped, or the cord snapped, or it got brushed the wrong way, or something - the poor thing never turned on again.  Almost immediately after I had purchased it, though, I discovered the [ODROID C2](http://www.hardkernel.com/main/products/prdt_info.php?g_code=G145457216438) - double the RAM, unhindered 64-bit ARM, dedicated 5V in, for really what amounts to the same price?  Talk about immediate buyers remorse.  I promised myself not to buy one because the RPi really was good enough, but should anything happen to it, I knew what the replacement would be.
### Dramatis Personae
Sure enough, about 11 months after the Great Death, I've gone and done it!  Here's the device:

**PICS HERE**

It was great getting peripherals with the benefit of hindsight this time around.  One of the issues I had with the old setup was portability - the bits were small, but a lot of wires were necessary to keep everything running.  I had the RPi itself in a case, but the USB hub, external SSD were just kinda...near it, and the wifi was spotty so I preferred to have it wired.  It was fragile - fine as long as nobody touched it, but pretty susceptible to power cycles and data IO errors just through jostling.  A primary goal of the new setup was portability - I want to plug in one thing, and be able to move all of it at once.  I had also slapped a pretty big heat sink on the RPi, but it would still run a little hot for comfort from time to time, so active cooling was preferred.

The [case](https://www.amazon.com/gp/product/B01LZ5WGET/ref=oh_aui_detailpage_o03_s00?ie=UTF8&psc=1) I went with came with the fan and proper cutouts and mounting equipment - it only took about 30 minutes to put together and feels very sturdy, while still providing full access to all ports and GPIO pins. I'd need to unscrew the top to access the I2C pins, but after powering the fan I probably won't need to touch them again.  It was cheap but doesn't feel it - the only complaint I had is that the little plastic spaces included to keep the board riased were a mess, it took a while to clen out the excess plastic.  One was completely deformed, an i thought I was going to have to forgo it until I cut a chunk out.  All in all though, a minor nitpick in an otherwise great case.

I especially like the cutouts on the bottom panel allowing esy access to both the microSD slot and the eMMC slot.  The Pi didn't have the eMMC option, so I splurged on a 32GB one preloaded with Ubuntu Mate from HARDKERNEL to see if it would make a difference - boy, does it make a difference.  This machine screams in comparison, even headless.

I also didn't want to feel like I always wanted to be tethered again, so I picked up that massive grey 802.11ac [dongle](https://www.amazon.com/gp/product/B074B9HNFP/ref=oh_aui_detailpage_o02_s00?ie=UTF8&psc=1).  Maybe unnecessary, but not unreasonably priced for the assurance granted.

I wanted to skip the USB hub/massive external drive to start off - I still have that drive and may change my mind about this, but I had pulled some wacky crap where the RPi booted from the SD card but then mounted /var, /home, and /usr/portage from the external drive.  It did grant a speed increase, but if theynthing happened to that connection/drive it was not bootable.

None of that this time around.  I think the spped increase from the eMMC will make up for the difference, and I want the whole thing to boot fine without the USB drives.

The two little subs inserted are each [128GB](https://www.amazon.com/gp/product/B01BGTG2A0/ref=oh_aui_detailpage_o01_s00?ie=UTF8&psc=1).  It's a far cry from the terabyte I made available to the RPi but I can always add that back to the setup if I want.  These drives are USB 3.0 and the C2 is only USB 2.0 equipped - such is life.  I'm considering a RAID 1 setup on these, but may skip it and just keep them separate, time will tell.
### The Great Compile
For an extra two bucks, they sell an eMMC to microSD adapter, so you can write to the card yourself.  While Ubuntu MATE would absolutely be adequate for my purposes, why not see if I can't get [Gentoo](https://www.gentoo.org/) on it instead?

If you're unfamiliar with Gentoo, how did you find this?  Anyway, Gentoo's shtick is that it requires you (for the most part) to compile software all software yourself from source.  A lot of people rightly argue that the speed increase that affords is negligible at best and not a reason to prefer it over binary distros which have a much quicker install process of just unpacking prebuilt binaries for your architecture.

To me, though, the appeal of Gentoo isn't so much speed but flexibility.  The package manager `portage` is far and away the best system I've ever used, and once you get used to managing USE flags, it's hard to go back.  The ability to toggle on and off features across your whole system and to recompile everything to that it's all linked together nicely and built against iself correctly is beautiful - it's more a meta-distribution that anything.  Portage is a tool that lets you build your own distros any way you like.  Some of the features, slots in particular, I'm reasonably convinced are ancient arcane magic.  I'm told it's a BSD-style `ports`-like system, but I've used BSD for a grand total of 20 minutes so can't personally attest to that.  If that's the case, though, I like their style.

I like cutting cruft, and it's especially important in space-constrained situations like this one - 2 GB of RAM is a ton for hardware this size and price but still limited in terms of what it can handle.  The only cost for this flexibility is time - and what a negligible cost.  I use Gentoo as my daily driver as well, and yes, the installation takes a while but afterwards it's just like using anything else.  I run my `emerge --sync && emerge -avuDNt @world` at night, and wake up to newly built stuff.  Or occasionally build errors, but honestly even unstable (`~`) breaks very infrequently. 

Well, lots of reasons, probably, but I'm using the Everest defence - I can.  It's an option available to me.  So buckle up, nerds.


crossdev

-binfmt_misc