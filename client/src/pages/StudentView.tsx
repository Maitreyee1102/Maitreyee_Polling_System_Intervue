import React, { useEffect, useState } from 'react';
import { Poll, formatSeconds } from '../types/poll.types';
import { ChatMessage } from '../types/chat.types';

import '../css/studentview.css';
import { useChatPanel } from '../components/ChatPanel';

type StudentViewProps = {
  studentName: string | null;
  setStudentName: (name: string) => void;
  activePoll: Poll | null;
  remainingSeconds: number;
  totalVotes: number;
  onSubmitVote: (optionId: string) => void;
  isKicked: boolean;
  chatMessages: ChatMessage[];
  onSendChatMessage: (text: string) => void;
  participants: { id: string; name?: string; role: 'teacher' | 'student' }[];
};

const StudentView: React.FC<StudentViewProps> = ({
  studentName,
  setStudentName,
  activePoll,
  remainingSeconds,
  totalVotes,
  onSubmitVote,
  isKicked,
  chatMessages,
  onSendChatMessage,
  participants
}) => {
  const [tempName, setTempName] = useState('');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeChatTab, setActiveChatTab] = useState<'chat' | 'participants'>('chat');

  // Reset selection/submission when a new poll starts
  useEffect(() => {
    setSelectedOptionId(null);
    setHasSubmitted(false);
  }, [activePoll?.id]);

  const renderTimer = () => {
    const display = activePoll?.isActive ? formatSeconds(remainingSeconds) : '00:00';
    return (
      <div className="timer">
        <span className="timer-dot" /> {display}
      </div>
    );
  };

  if (!studentName) {
    return (
      <div className="welcome-screen">
        <div className="welcome-card">
          <h1 className="welcome-title">
            Join <strong>IntervuePoll</strong>
          </h1>
          <p className="welcome-subtitle">
            Enter your name to participate in the live classroom poll. This will be unique to
            this browser tab.
          </p>
          <div className="form-group">
            <label htmlFor="student-name">Your Name</label>
            <input
              id="student-name"
              type="text"
              placeholder="e.g. Riya Sharma"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
            />
          </div>
          <button
              className="btn btn-primary join-session-btn"
              type="button"
              onClick={() => {
                if (tempName.trim()) {
                  setStudentName(tempName.trim());
                }
              }}
          >
            Join Session
          </button>
        </div>
      </div>
    );
  }

  if (isKicked) {
    return (
      <div className="welcome-screen">
        <div className="welcome-card">
          <h1 className="welcome-title">You&apos;ve been removed</h1>
          <p className="welcome-subtitle">
            The teacher has removed you from this session. Please contact your instructor if
            you believe this was a mistake.
          </p>
        </div>
      </div>
    );
  }

  const canVote =
    !!activePoll && activePoll.isActive && remainingSeconds > 0 && !hasSubmitted;

  const handleSubmit = () => {
    if (!activePoll || !selectedOptionId || !canVote) return;
    onSubmitVote(selectedOptionId);
    setHasSubmitted(true);
  };

  return (
    <>
      <div className="student-main-container">
        <div className="card">
          <div className="card-title">
            Hello, {studentName}
            {renderTimer()}
          </div>

          {activePoll ? (
            activePoll.isActive && remainingSeconds > 0 ? (
              hasSubmitted ? (
                <>
                  <div className="page-subtitle">
                    Waiting for teacher to end this question and show results...
                  </div>
                </>
              ) : (
                <>
                  <div className="poll-question">{activePoll.question}</div>
                  <div className="participant-list">
                    {activePoll.options.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        className={`participant-item${selectedOptionId === opt.id ? ' selected' : ''}${canVote ? ' can-vote' : ''}`}
                        onClick={() => {
                          if (!canVote) return;
                          setSelectedOptionId(opt.id);
                        }}
                      >
                        <span className="participant-name">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    className="btn btn-primary submit-answer-btn"
                    type="button"
                    disabled={!canVote || !selectedOptionId}
                    onClick={handleSubmit}
                  >
                    Submit Answer
                  </button>
                </>
              )
            ) : (
              <>
                <div className="page-subtitle">
                  Time is up! Here are the results:
                </div>
                <div className="poll-question">{activePoll.question}</div>
                {activePoll.options.map((opt, index) => {
                  const pct = totalVotes
                    ? Math.round((opt.votes / totalVotes) * 100)
                    : 0;
                  const dotClass =
                    index === 0
                      ? 'option-dot a'
                      : index === 1
                      ? 'option-dot b'
                      : index === 2
                      ? 'option-dot c'
                      : 'option-dot d';
                  return (
                    <div key={opt.id} className="result-item">
                      <div className="result-header">
                        <div className="result-label">
                          <span className={dotClass} />
                          {opt.label}
                          {opt.isCorrect && (
                            <span className="correct-label">Correct</span>
                          )}
                        </div>
                        <div className="result-pct">{pct}%</div>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </>
            )
          ) : (
            <>
              <div className="page-subtitle">
                Waiting for the teacher to start a poll.
              </div>
            </>
          )}
        </div>
      </div>

      {/* Floating chat icon and panel, mirroring the teacher view */}
      {useChatPanel({
        chatMessages,
        onSendChatMessage,
        isChatOpen,
        setIsChatOpen,
        activeChatTab,
        setActiveChatTab,
        participants
      })}
    </>
  );
};

export default StudentView;

