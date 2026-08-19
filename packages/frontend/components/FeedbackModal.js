/**
 * FeedbackModal — free-text feedback / feature-idea box.
 *
 * Submits to api/feedback (see that file's header for why this goes to
 * Telegram and deliberately NOT to a GitHub issue: this repo is public and
 * autonomous agents read+act on its issue queue, so unmoderated visitor text
 * landing straight there would be a prompt-injection vector. A human decides
 * which ideas become real work.)
 *
 * Modal chrome (backdrop + tap-outside-to-close + content card) follows the
 * established pattern in GearCardShare.js's CardPreviewModal.
 */
import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Platform } from 'react-native';
import { colors } from '../colors';
import { spacing } from '../spacing';
import { fontSize, fontWeight } from '../typography';

function currentPagePath() {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    return window.location.pathname;
  }
  return null;
}

export default function FeedbackModal({ visible, onClose }) {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState(''); // must stay empty; real users never see this field
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorText, setErrorText] = useState('');

  const reset = useCallback(() => {
    setMessage('');
    setEmail('');
    setHoneypot('');
    setStatus('idle');
    setErrorText('');
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    // Reset after the close animation, not before, so the form doesn't
    // visibly flash empty while the modal is still fading out.
    setTimeout(reset, 250);
  }, [onClose, reset]);

  const handleSubmit = useCallback(async () => {
    if (!message.trim() || status === 'sending') return;
    setStatus('sending');
    setErrorText('');
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message.trim(),
          email: email.trim() || undefined,
          page: currentPagePath(),
          hp: honeypot,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('error');
        setErrorText(data.error || 'Something went wrong. Please try again.');
        return;
      }
      setStatus('sent');
    } catch {
      setStatus('error');
      setErrorText('Network error — please try again.');
    }
  }, [message, email, honeypot, status]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={handleClose}>
        {/* Swallow taps on the card itself so they don't bubble to the backdrop's close handler. */}
        <TouchableOpacity activeOpacity={1} onPress={() => {}} style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>💡 Feedback &amp; feature ideas</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton} accessibilityRole="button" accessibilityLabel="Close">
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {status === 'sent' ? (
            <View style={styles.body}>
              <Text style={styles.sentText}>Thanks! Your feedback goes straight to the founder. 🤘</Text>
              <TouchableOpacity onPress={handleClose} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.body}>
              <Text style={styles.hint}>Found a bug? Want a drummer or feature we're missing? Tell us.</Text>
              <TextInput
                style={styles.textarea}
                placeholder="What's on your mind?"
                placeholderTextColor={colors.text.muted}
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
                maxLength={2000}
                editable={status !== 'sending'}
              />
              <TextInput
                style={styles.emailInput}
                placeholder="Email (optional, if you want a reply)"
                placeholderTextColor={colors.text.muted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={status !== 'sending'}
              />
              {/* Honeypot: hidden from real users (off-screen, unreachable by
                  tab), invisible to assistive tech. Bots that blindly fill
                  every field trip it; humans never see or touch it. */}
              <TextInput
                style={styles.honeypot}
                value={honeypot}
                onChangeText={setHoneypot}
                tabIndex={-1}
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
                autoComplete="off"
              />

              {status === 'error' && <Text style={styles.errorText}>{errorText}</Text>}

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={!message.trim() || status === 'sending'}
                style={[styles.submitButton, (!message.trim() || status === 'sending') && styles.submitButtonDisabled]}
              >
                <Text style={styles.submitButtonText}>{status === 'sending' ? 'Sending…' : 'Send feedback'}</Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[4],
  },
  card: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: colors.bg.elevated,
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text.primary,
  },
  closeButton: {
    padding: spacing[1],
  },
  closeButtonText: {
    color: colors.text.secondary,
    fontSize: fontSize.lg,
  },
  body: {
    padding: spacing[4],
  },
  hint: {
    color: colors.text.secondary,
    fontSize: fontSize.sm,
    marginBottom: spacing[3],
  },
  textarea: {
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: 8,
    padding: spacing[3],
    color: colors.text.primary,
    fontSize: fontSize.base,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: spacing[2],
  },
  emailInput: {
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: 8,
    padding: spacing[3],
    color: colors.text.primary,
    fontSize: fontSize.base,
    marginBottom: spacing[3],
  },
  // Off-screen and unreachable — never visible or focusable for real users.
  honeypot: {
    position: 'absolute',
    left: -9999,
    top: -9999,
    width: 1,
    height: 1,
    opacity: 0,
  },
  errorText: {
    color: '#ef4444',
    fontSize: fontSize.sm,
    marginBottom: spacing[3],
  },
  sentText: {
    color: colors.text.primary,
    fontSize: fontSize.base,
    marginBottom: spacing[4],
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: colors.brand.primary,
    borderRadius: 8,
    paddingVertical: spacing[3],
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
});
