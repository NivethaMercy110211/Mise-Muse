/* ==========================================================================
   MISE & MUSE - GIFT EXPERIENCES & CORPORATE EVENTS INTERACTIVITY
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initGiftBuilder();
  initCorporateBuilder();
});

// Interactive Gift Card Wizard
function initGiftBuilder() {
  const previewTitle = document.getElementById('giftPreviewTitle');
  const previewMsg = document.getElementById('giftPreviewMsg');
  const previewRecipient = document.getElementById('giftPreviewRecipient');
  const previewAmount = document.getElementById('giftPreviewAmount');

  const expSelect = document.getElementById('giftExperienceSelect');
  const recipientInput = document.getElementById('giftRecipientName');
  const msgInput = document.getElementById('giftMessageInput');
  const deliveryRadios = document.querySelectorAll('input[name="deliveryMethod"]');
  const giftForm = document.getElementById('giftBuilderForm');

  if (!giftForm) return;

  function updatePreview() {
    if (expSelect && previewTitle) {
      const selectedOpt = expSelect.options[expSelect.selectedIndex];
      previewTitle.innerText = selectedOpt.text;
      if (previewAmount) previewAmount.innerText = `$${selectedOpt.getAttribute('data-price') || '150'}.00`;
    }
    if (recipientInput && previewRecipient) {
      previewRecipient.innerText = recipientInput.value.trim() ? `Prepared for: ${recipientInput.value.trim()}` : 'Prepared for: A Culinary Explorer';
    }
    if (msgInput && previewMsg) {
      previewMsg.innerText = msgInput.value.trim() ? `"${msgInput.value.trim()}"` : '"A sensory evening of cooking, creating and gathering at Mise & Muse."';
    }
  }

  if (expSelect) expSelect.addEventListener('change', updatePreview);
  if (recipientInput) recipientInput.addEventListener('input', updatePreview);
  if (msgInput) msgInput.addEventListener('input', updatePreview);

  giftForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const code = 'GIFT-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    window.showToast(`Gift Experience Voucher created! Code: ${code}`);
    alert(`Thank you! Your Mise & Muse Gift Experience has been generated.\n\nDigital Voucher Code: ${code}\nA personalized invitation has been prepared for ${recipientInput ? recipientInput.value : 'your recipient'}.`);
  });

  updatePreview();
}

// Corporate Cooking Event Interactive Estimator & Configurator
function initCorporateBuilder() {
  const sizeSlider = document.getElementById('teamSizeSlider');
  const sizeDisplay = document.getElementById('teamSizeDisplay');
  const estTotal = document.getElementById('corpEstTotal');
  const expTypeRadios = document.querySelectorAll('input[name="corpExpType"]');
  const corpForm = document.getElementById('corporateInquiryForm');

  if (!sizeSlider) return;

  function recalculate() {
    const teamSize = parseInt(sizeSlider.value, 10);
    if (sizeDisplay) sizeDisplay.innerText = `${teamSize} Participants`;

    let baseRate = 165; // per person
    expTypeRadios.forEach(r => {
      if (r.checked) {
        baseRate = parseInt(r.getAttribute('data-rate') || 165, 10);
      }
    });

    const total = teamSize * baseRate;
    if (estTotal) estTotal.innerText = `$${total.toLocaleString('en-US')}`;
  }

  sizeSlider.addEventListener('input', recalculate);
  expTypeRadios.forEach(r => r.addEventListener('change', recalculate));

  if (corpForm) {
    corpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      window.showToast('Corporate inquiry received. Our culinary events team will respond within 4 hours.');
      alert('Thank you! Your Team Culinary Experience request has been submitted to Chef Sommelier & Event Director Camille Laurent.');
      corpForm.reset();
      recalculate();
    });
  }

  recalculate();
}
