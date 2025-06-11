import React from 'react';
import Card from '../components/Card';
import '../styles/ThankYouPage.css';

const ThankYouPage = () => {
  const steps = [
    {
      id: 1,
      title: "Review Your Contract",
      description: "Check your employment contract for notice period requirements, non-compete clauses, and any contractual obligations you need to fulfill before leaving.",
      icon: "📋",
      details: [
        "Review notice period (usually 2-4 weeks)",
        "Check for any restrictive covenants",
        "Note any outstanding commitments or projects"
      ]
    },
    {
      id: 2,
      title: "Prepare Your Resignation Letter",
      description: "Write a formal, professional resignation letter stating your last day of work and expressing gratitude for the opportunities provided.",
      icon: "✍️",
      details: [
        "Keep it professional and positive",
        "State your last working day clearly",
        "Express appreciation for the experience",
        "Offer to help with the transition"
      ]
    },
    {
      id: 3,
      title: "Schedule a Meeting",
      description: "Arrange a private meeting with your direct supervisor or HR department to formally submit your resignation and discuss the transition process.",
      icon: "📅",
      details: [
        "Request a private meeting with your supervisor",
        "Choose an appropriate time and place",
        "Bring your resignation letter",
        "Be prepared to discuss transition plans"
      ]
    },
    {
      id: 4,
      title: "Complete Handover Process",
      description: "Document your current responsibilities, ongoing projects, and important contacts. Train your replacement or colleagues who will take over your duties.",
      icon: "🔄",
      details: [
        "Create detailed handover documentation",
        "List all ongoing projects and their status",
        "Share important contacts and relationships",
        "Train colleagues or replacement staff"
      ]
    },
    {
      id: 5,
      title: "Finalize Administrative Tasks",
      description: "Complete all exit procedures including returning company property, updating personal information, and ensuring all administrative requirements are met.",
      icon: "✅",
      details: [
        "Return company equipment and access cards",
        "Complete exit interview if required",
        "Update forwarding address for final documents",
        "Ensure final paycheck and benefits are processed"
      ]
    }
  ];

  const handleBackToDashboard = () => {
    window.location.hash = '';
  };

  return (
    <div className="thank-you-page">
      <div className="thank-you-container">
        <header className="thank-you-header">
          <div className="header-content">
            <button 
              onClick={handleBackToDashboard}
              className="back-button"
              aria-label="Back to Dashboard"
            >
              ← Back to Dashboard
            </button>
            <div className="header-main">
              <h1 className="page-title">Your Departure Plan</h1>
              <p className="page-subtitle">
                Here's your comprehensive 5-step plan for leaving Sofmedica professionally and smoothly.
              </p>
            </div>
          </div>
        </header>

        <main className="thank-you-main">
          <div className="steps-container">
            {steps.map((step, index) => (
              <Card key={step.id} className="step-card">
                <div className="step-content">
                  <div className="step-header">
                    <div className="step-number-container">
                      <span className="step-number">{step.id}</span>
                      <span className="step-icon">{step.icon}</span>
                    </div>
                    <div className="step-info">
                      <h3 className="step-title">{step.title}</h3>
                      <p className="step-description">{step.description}</p>
                    </div>
                  </div>
                  
                  <div className="step-details">
                    <h4 className="details-title">Key Actions:</h4>
                    <ul className="details-list">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="detail-item">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="final-message-card">
            <div className="final-message">
              <div className="message-icon">🎯</div>
              <h3 className="message-title">Remember</h3>
              <p className="message-text">
                Leaving a job is a significant career decision. Take time to ensure this is the right choice for you, 
                and always maintain professionalism throughout the process. Your reputation is valuable - leave on good terms 
                whenever possible.
              </p>
              <div className="message-actions">
                <button 
                  onClick={handleBackToDashboard}
                  className="primary-button"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ThankYouPage;