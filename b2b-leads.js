(function(){
  const email = 'nickelplatingpro@outlook.com';
  const pageName = document.body.dataset.productPage || document.querySelector('h1')?.textContent?.trim() || document.title;

  function encode(value){
    return encodeURIComponent(value || '');
  }

  function openModal(modal){
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    const firstField = modal.querySelector('input,select,textarea');
    if(firstField) firstField.focus();
  }

  function closeModal(modal){
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden','true');
  }

  document.addEventListener('DOMContentLoaded', function(){
    const trigger = document.createElement('button');
    trigger.className = 'quote-trigger';
    trigger.type = 'button';
    trigger.textContent = 'Request a Quote';

    const modal = document.createElement('div');
    modal.className = 'quote-modal';
    modal.setAttribute('aria-hidden','true');
    modal.innerHTML = `
      <div class="quote-panel" role="dialog" aria-modal="true" aria-labelledby="quote-title">
        <div class="quote-head">
          <div>
            <h2 id="quote-title">Request a Quote</h2>
            <p>Share your application details so we can recommend the right plating chemistry and quantity.</p>
          </div>
          <button class="quote-close" type="button" aria-label="Close quote form">x</button>
        </div>
        <form class="quote-form">
          <div class="quote-row">
            <label>Name
              <input name="name" autocomplete="name" required>
            </label>
            <label>Company
              <input name="company" autocomplete="organization">
            </label>
          </div>
          <div class="quote-row">
            <label>Email
              <input name="email" type="email" autocomplete="email" required>
            </label>
            <label>Phone
              <input name="phone" type="tel" autocomplete="tel">
            </label>
          </div>
          <div class="quote-row">
            <label>Industry Type
              <select name="industry" required>
                <option value="">Select industry</option>
                <option>Aerospace</option>
                <option>Automotive</option>
                <option>Manufacturing / Job Shop</option>
                <option>Defense</option>
                <option>Oil & Gas</option>
                <option>Electronics</option>
                <option>Restoration</option>
                <option>Other</option>
              </select>
            </label>
            <label>Estimated Volume
              <select name="volume">
                <option>Prototype / sample</option>
                <option>Small batch</option>
                <option>Repeat production</option>
                <option>Bulk chemistry supply</option>
              </select>
            </label>
          </div>
          <label>Application Details
            <textarea name="details" placeholder="Base metal, part size, finish goal, bath volume, and timeline"></textarea>
          </label>
          <div class="quote-actions">
            <button class="quote-submit" type="submit">Send Quote Request</button>
            <p class="quote-note">Opens your email with the request details filled in.</p>
          </div>
        </form>
      </div>`;

    document.body.append(trigger, modal);

    trigger.addEventListener('click', () => openModal(modal));
    modal.querySelector('.quote-close').addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', event => {
      if(event.target === modal) closeModal(modal);
    });
    document.addEventListener('keydown', event => {
      if(event.key === 'Escape' && modal.classList.contains('is-open')) closeModal(modal);
    });

    modal.querySelector('.quote-form').addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const body = [
        `Product page: ${pageName}`,
        `Name: ${data.get('name')}`,
        `Company: ${data.get('company')}`,
        `Email: ${data.get('email')}`,
        `Phone: ${data.get('phone')}`,
        `Industry type: ${data.get('industry')}`,
        `Estimated volume: ${data.get('volume')}`,
        '',
        'Application details:',
        data.get('details')
      ].join('\n');
      window.location.href = `mailto:${email}?subject=${encode('Production plating quote request')}&body=${encode(body)}`;
    });
  });
})();
