import { ChatMessage } from '../types/chat.types';
import React, { Dispatch, SetStateAction } from 'react';

export type UseChatPanelProps = {
  chatMessages: ChatMessage[];
  onSendChatMessage: (text: string) => void;
  isChatOpen: boolean;
  setIsChatOpen: Dispatch<SetStateAction<boolean>>;
  activeChatTab: 'chat' | 'participants';
  setActiveChatTab: Dispatch<SetStateAction<'chat' | 'participants'>>;
  participants: { id: string; name?: string; role: 'teacher' | 'student' }[];
  onKickParticipant?: (id: string) => void;
};

export function useChatPanel({
  chatMessages,
  onSendChatMessage,
  isChatOpen,
  setIsChatOpen,
  activeChatTab,
  setActiveChatTab,
  participants,
  onKickParticipant
}: UseChatPanelProps) {
  // Returns the chat panel JSX
  return (
    <>
      <button
        type="button"
        className="chat-fab"
        onClick={() => setIsChatOpen((open) => !open)}
      >
        💬
      </button>
      {isChatOpen && (
        <div className="card chat-panel">
          <div className="chat-tabs">
            <button
              type="button"
              className={`tab tab-flex${activeChatTab === 'chat' ? ' active' : ''}`}
              onClick={() => setActiveChatTab('chat')}
            >
              Chat
            </button>
            <button
              type="button"
              className={`tab tab-flex${activeChatTab === 'participants' ? ' active' : ''}`}
              onClick={() => setActiveChatTab('participants')}
            >
              Participants
            </button>
          </div>
          {activeChatTab === 'chat' ? (
            <div className="chat-content-flex">
              <div className="chat-section-title">Chat</div>
              <div className="chat-scroll-area">
                {chatMessages.map((m) => (
                  <div key={m.id} style={{ marginBottom: 6 }}>
                    <strong>{m.senderName}:</strong> {m.text}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="chat-input"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onSendChatMessage((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  style={{ padding: '6px 10px' }}
                  onClick={() => {
                    const input = document.querySelector(
                      'input[placeholder="Type a message..."]'
                    ) as HTMLInputElement | null;
                    if (!input) return;
                    onSendChatMessage(input.value);
                    input.value = '';
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div className="chat-content-flex">
              <div className="chat-section-title">Participants</div>
              <div className="chat-scroll-area participants-scroll-area">
                {participants.map((p) => (
                  <div key={p.id}>
                    {p.name ?? (p.role === 'teacher' ? 'Teacher' : p.id)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
