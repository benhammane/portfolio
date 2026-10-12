import { useCallback } from 'react';

// Un seul AudioContext pour tout le site, créé au premier clic.
// Avant : un nouveau contexte par clic, jamais fermé → fuite mémoire/CPU et
// son qui finit par ne plus sortir (les navigateurs plafonnent le nombre de contextes).
let sharedContext: AudioContext | null = null;

const getContext = () => {
  if (!sharedContext) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    sharedContext = new Ctor();
  }
  if (sharedContext.state === 'suspended') void sharedContext.resume();
  return sharedContext;
};

// Professional click sound using Web Audio API
export const useClickSound = () => {
  const playClick = useCallback(() => {
    try {
      const audioContext = getContext();

      // Create a short, professional click sound
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Professional click: short, subtle, high-frequency
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.05);

      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.08);
      // Libère les nœuds une fois le son joué
      oscillator.onended = () => {
        oscillator.disconnect();
        gainNode.disconnect();
      };
    } catch {
      // Silently fail if audio context is not available
    }
  }, []);

  return { playClick };
};
