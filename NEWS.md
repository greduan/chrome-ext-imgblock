# News (Changelog for users)

All changes that would affect users will be listed in this file.

## 0.1.0-alpha - 2014-11-10

Initial release.  Lots of testing to be done, lots of features to be added.  But
the core features are integrated.

Right now if you enable this plugin it will block ALL images that go through
`http://` or `https://` and there is no way to stop this behaviour at this
moment.  As needed, I will add whitelist features, settings, etc.

It will block the images by stopping the web request and will replace it with a
placeholder black image.  If you click the placeholder then it'll load the image
correctly.  If you click the now-loaded-image then you will be sent to whatever
link the image is linked to (if any).
