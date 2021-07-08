const snap = `
 (function(win, doc, sdk_url){
    if(win.snaptr) return;
    var tr=win.snaptr=function(){
    tr.handleRequest? tr.handleRequest.apply(tr, arguments):tr.queue.push(arguments);
  };
    tr.queue = [];
    var s='script';
    var new_script_section=doc.createElement(s);
    new_script_section.async=!0;
    new_script_section.src=sdk_url;
    var insert_pos=doc.getElementsByTagName(s)[0];
    insert_pos.parentNode.insertBefore(new_script_section, insert_pos);
  })(window, document, 'https://sc-static.net/scevent.min.js');
    snaptr('init','2615a7c0-d8e9-4ae6-9914-814a1017010d')
    snaptr('track','PAGE_VIEW')
`

export const allTracking = (nonce: string) => `
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5BCDJ2B');</script>
<!-- End Google Tag Manager -->

<script nonce="${nonce}">
${[snap].join(';\n')}
</script>


<script nonce="${nonce}">
  window.intercomSettings = {
    app_id: "ziqa7goa",
    vertical_padding: 48,   // 3rem
    horizontal_padding: 32  // 2rem
  };
</script>
<script nonce="${nonce}">
window.setTimeout(function() {
(function () { var w = window; var ic = w.Intercom; if (typeof ic === "function") { ic('reattach_activator'); ic('update', w.intercomSettings); } else { var d = document; var i = function () { i.c(arguments); }; i.q = []; i.c = function (args) { i.q.push(args); }; w.Intercom = i; var l = function () { var s = d.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://widget.intercom.io/widget/ziqa7goa'; var x = d.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); }; l() } })();
}, 5000);
</script>
`
