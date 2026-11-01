import { EvaluationResult, ApiSettings } from '../types';

const HISTORY_KEY = 'viabl_evaluation_history';
const SETTINGS_KEY = 'viabl_api_settings';

export function getEvaluationHistory(): EvaluationResult[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read evaluation history:', err);
    return [];
  }
}

export function saveEvaluationToHistory(evaluation: EvaluationResult): void {
  try {
    const current = getEvaluationHistory();
    // Prepend new evaluation, deduplicate by id
    const updated = [evaluation, ...current.filter(item => item.id !== evaluation.id)].slice(0, 20); // keep last 20
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save evaluation:', err);
  }
}

export function removeEvaluationFromHistory(id: string): EvaluationResult[] {
  try {
    const current = getEvaluationHistory();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to delete evaluation:', err);
    return [];
  }
}

export function clearAllHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (err) {
    console.error('Failed to clear history:', err);
  }
}

export function getSavedSettings(): ApiSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      return {
        geminiApiKey: '',
        openaiApiKey: '',
        preferredEngine: 'auto'
      };
    }
    return JSON.parse(raw);
  } catch {
    return {
      geminiApiKey: '',
      openaiApiKey: '',
      preferredEngine: 'auto'
    };
  }
}

export function saveSettings(settings: ApiSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save settings:', err);
  }
}
