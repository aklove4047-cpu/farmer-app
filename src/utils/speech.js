export function speakText(text, lang = 'hi') {
  if (!('speechSynthesis' in window)) {
    alert("आपके ब्राउज़र में आवाज़ (Text to Speech) समर्थित नहीं है।");
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
  utterance.rate = 0.95; // slightly slower for clarity
  utterance.pitch = 1.0;

  // Try finding a suitable Hindi or Indian voice
  const voices = window.speechSynthesis.getVoices();
  const targetVoice = voices.find(v => 
    lang === 'hi' 
      ? (v.lang.includes('hi') || v.name.toLowerCase().includes('hindi'))
      : (v.lang.includes('en-IN') || v.lang.includes('en-US'))
  );

  if (targetVoice) {
    utterance.voice = targetVoice;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
