var adurl_sample = 'http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&' +
      'iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&' +
      'impl=s&gdfp_req=1&env=vp&output=xml_vmap1&unviewed_position_start=1&' +
      'cust_params=sample_ar%3Dpremidpostpod%26deployment%3Dgmf-js&cmsid=496&' +
      'vid=short_onecue&correlator=';

var vast_url1 = 'http://ad4.liverail.com/?LR_PUBLISHER_ID=45449&LR_SCHEMA=vast2-vpaid' +
                    '&LR_VERTICALS=philly_rail_philadelphia_sports&LR_VIDEO_ID=__item-test_video' +
                    '&LR_AUTOPLAY=1&LR_MUTED=1&LR_TAGS=rail,philly,&LR_VIDEO_AMID=philadelphia_sports' +
                    '&LR_FORMAT=application/x-shockwave-flash;application/javascript';

var vast_url2 = "http://ad3.liverail.com/?LR_PUBLISHER_ID=1331&LR_CAMPAIGN_ID=229&LR_SCHEMA=vast2";

var player = videojs('content_video');

google.ima.settings.setVpaidAllowed(true);

var options = {
  debug: true,
  id: 'content_video',
  adTagUrl: vast_url1
};

player.ima(options);

old_fun = player.ima.onAdError_;

player.ima.onAdError_ = function(adErrorEvent) {
  console.log("in ad error");
  var error = adErrorEvent.getError().toString();
  if (error.indexOf("AdError 901") != -1) {
    // Error code 901 denotes flash content
    var flash = document.getElementById("SdkIntegration");
    console.log("load flash ad");
    flash.requestAds(options.adTagUrl);
    // $("#content_video").addClass("hide");
    // $("#SdkIntegrationWrapper").removeClass("hide");
  }
  old_fun();
};

function flashOnComplete() {
  // call from swf object on ad play completion
  // $("#content_video").removeClass("hide");
  // $("#SdkIntegrationWrapper").addClass("hide");
  old_fun();
  player.ima.playContentFromZero_();
}

player.ima.requestAds();
player.play();

