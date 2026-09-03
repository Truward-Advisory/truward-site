document.addEventListener('DOMContentLoaded', function(){
  var toggle = document.getElementById('menuToggle');
  var panel = document.getElementById('mobilePanel');
  if(toggle && panel){
    toggle.addEventListener('click', function(){
      var isOpen = panel.style.display === 'flex';
      panel.style.display = isOpen ? 'none' : 'flex';
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });
    panel.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        panel.style.display = 'none';
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var form = document.getElementById('contactForm');
  if(form){
    var err = document.getElementById('formErr');
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = document.getElementById('fname').value.trim();
      var email = document.getElementById('femail').value.trim();
      var message = document.getElementById('fmsg').value.trim();
      if(!name || !email || !message){
        err.textContent = 'Fill in your name, email, and a short message before sending.';
        return;
      }
      err.textContent = '';
      var org = document.getElementById('forg').value.trim();
      var subject = encodeURIComponent('Introduction from ' + name + (org ? ' (' + org + ')' : ''));
      var body = encodeURIComponent(message + '\n\n— ' + name + (org ? ', ' + org : '') + '\n' + email);
      window.location.href = 'mailto:hello@truwardadvisory.com?subject=' + subject + '&body=' + body;
    });
  }
});
