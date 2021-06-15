
# Nvd: Node Video Downloader (beta)

Nvd, Node Video Downloader, is for downloading videos that is hard or cannot be downloaded with downloader software (such as Jdownloader2) or browser extension (such as video downloadhelper), on the internet.

Since this is a beta version, currently there is only officially supported website (javhub.net [nsfw]).

Downloding more videos from various sites using Nvd should be totally possible. I'm going to update Nvd for more supported sites, but I'm welcoming your support and contributions.

**Disclaimer: This software is only for educational purposes.**

![./image.png](https://raw.githubusercontent.com/yuis-ice/nvd/main/image.png)

## Build

```sh
git clone https://github.com/yuis-ice/nvd.git && cd nvd
docker build -t nvd -f nvd.dockerfile .
```

## Usage

```sh
docker run -it --rm --name nvd -v $PWD/out:/out \
	-e url='https://javhub.net/play/ZWDmJZHsxBLfLXUmReigeMm7dYU0CA1whn8ccpv02zU/r18-030-free-information-office-a-week-autumn-compensated-dating-keiyo-line-u-18' \
	-e output='/out/R18-030.mp4' \
	-e server='1' \
	nvd
```
