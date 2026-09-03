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
    var submitBtn = document.getElementById('formSubmit');

    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = document.getElementById('fname').value.trim();
      var email = document.getElementById('femail').value.trim();
      var message = document.getElementById('fmsg').value.trim();
      var org = document.getElementById('forg').value.trim();

      if(!name || !email || !message){
        err.textContent = 'Fill in your name, email, and a short message before sending.';
        return;
      }
      err.textContent = '';

      var fsubject = document.getElementById('fsubject');
      if(fsubject){
        fsubject.value = 'New introduction from ' + name + (org ? ' (' + org + ')' : '');
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function(response){
        if(response.ok){
          window.location.href = 'thank-you.html';
        } else {
          response.json().then(function(data){
            var msg = (data && data.errors && data.errors.length) ? data.errors.map(function(x){ return x.message; }).join(', ') : 'Something went wrong. Try again, or email us directly.';
            err.textContent = msg;
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send introduction';
          });
        }
      }).catch(function(){
        err.textContent = 'Something went wrong. Try again, or email us directly.';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send introduction';
      });
    });
  }
});
