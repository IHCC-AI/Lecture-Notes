# VM

- [What is a VM](https://www.youtube.com/watch?v=FZR0rG3HKIk)
- Show windows running in a VM on Linux(or Mac)

## Install VM Software

You should have already installed a VM software. If not, here are some options:

- [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
- [VMware](https://www.vmware.com/products/workstation-player/workstation-player-evaluation.html)
- [Gnome Boxes](https://apps.gnome.org/Boxes/)

## Install Debian

We will use Debian as our base OS for the VM due to its stability and not having to install a DE.

### Making VM

- CLick New
- Name it `Debian`
    - OS version should be auto-detected
- Select ISO image (download folder .iso file)
- Un-check `Proceed with Unattended Installation`
- Give it enough Memory and disk space
    - Tell them at least 50gb if they can
        - It will only take up the space if it needs it, and they can delete it later.
- Turn VM on

### Installing Detain in VM

- Go though install and pick any DE. I recommend Gnome so they see something different.
- Make sure to enable SSH
- Make sure they write down their password.
    - Set it as something simple.
- If needed you might need to install VM drivers. This is so you get full resolution.
    - On boxes install space-spice
    - On VirtualBox, it should give you them.

```bash
su
apt update
apt install spice-vdagent
systemctl start spice-vdagent
sudo systemctl enable spice-vdagent
sudo systemctl status spice-vdagent
```

While installing if we have time talk about OSs

- [Linux in 100 Seconds](https://www.youtube.com/watch?v=rrB13utjYV4&t=30s)
- [Project is managed via a mailing list](https://lkml.org/lkml/last100/)
    - GitHub **MIRROR**: https://github.com/torvalds/linux

## Playing around with Fedora

- Show off software Store
- Show off `fastfetch`
- Show off settings
- Download `Space Cadet Pinball`
