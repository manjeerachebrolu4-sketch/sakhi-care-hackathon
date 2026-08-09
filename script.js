document.addEventListener("DOMContentLoaded", () => {

    const chatMessages = document.getElementById("chatMessages");
    const quickReplies = document.getElementById("quickReplies");
    const userInput = document.getElementById("userConcern");
    const sendButton = document.getElementById("analyzeButton");

    const newSessionButton =
        document.getElementById("newSessionButton");

    const progressLabel =
        document.getElementById("progressLabel");

    const progressBar =
        document.getElementById("progressBar");

    const languageSelect =
        document.getElementById("language");

    const explanationStyle =
        document.getElementById("explanationStyle");

    const results =
        document.getElementById("results");

    const safetyTitle =
        document.getElementById("safetyTitle");

    const safetyMessage =
        document.getElementById("safetyMessage");

    const understanding =
        document.getElementById("understanding");

    const known =
        document.getElementById("known");

    const nextTitle =
        document.getElementById("nextTitle");

    const nextMessage =
        document.getElementById("nextMessage");

    const doctorQuestions =
        document.getElementById("doctorQuestions");

    const summary =
        document.getElementById("summary");

    const copySummary =
        document.getElementById("copySummary");

    const mythInput =
        document.getElementById("mythInput");

    const mythButton =
        document.getElementById("mythButton");

    const mythResult =
        document.getElementById("mythResult");

    const state = {

        topic: null,

        answers: {},

        history: [],

        questionIndex: 0,

        currentQuestion: null,

        finished: false,

        redFlag: false

    };

    const TOTAL_QUESTIONS = 6;

    const topicQuestions = {

        periods: [

            {
                id: "change",

                text:
                    "What changed about your periods or cycle?",

                replies: [
                    "Coming late",
                    "Coming early",
                    "Heavier bleeding",
                    "Lighter bleeding",
                    "Pain changed",
                    "Something else"
                ]
            },

            {
                id: "duration",

                text:
                    "How long has this change been happening?",

                replies: [
                    "Less than 1 month",
                    "1–3 months",
                    "4–6 months",
                    "More than 6 months",
                    "Not sure"
                ]
            },

            {
                id: "pain",

                text:
                    "Are you having unusually severe pain, fainting, or feeling very weak?",

                replies: [
                    "No",
                    "Yes",
                    "Not sure",
                    "Prefer not to say"
                ]
            },

            {
                id: "pregnancy",

                text:
                    "Is pregnancy possible in your situation?",

                replies: [
                    "No",
                    "Yes",
                    "Not sure",
                    "Prefer not to say"
                ]
            },

            {
                id: "otherSymptoms",

                text:
                    "Have you noticed other changes such as acne, unusual hair growth, weight changes, or unusual tiredness?",

                replies: [
                    "Yes",
                    "No",
                    "Not sure",
                    "Prefer not to say"
                ]
            },

            {
                id: "impact",

                text:
                    "How much is this affecting your daily life?",

                replies: [
                    "A little",
                    "Moderately",
                    "A lot",
                    "Not sure"
                ]
            }

        ],

        pcos: [

            {
                id: "reason",

                text:
                    "What makes you wonder about PCOS?",

                replies: [
                    "Irregular periods",
                    "Acne",
                    "Hair growth",
                    "Weight changes",
                    "Several of these",
                    "Something else"
                ]
            },

            {
                id: "duration",

                text:
                    "How long have you noticed these changes?",

                replies: [
                    "Less than 1 month",
                    "1–3 months",
                    "4–6 months",
                    "More than 6 months",
                    "Not sure"
                ]
            },

            {
                id: "periods",

                text:
                    "How would you describe your usual cycle?",

                replies: [
                    "Regular",
                    "Often late",
                    "Very unpredictable",
                    "I don't know"
                ]
            },

            {
                id: "pain",

                text:
                    "Are you experiencing severe pain, fainting, or unusually heavy bleeding?",

                replies: [
                    "No",
                    "Yes",
                    "Not sure",
                    "Prefer not to say"
                ]
            },

            {
                id: "other",

                text:
                    "Are there any other symptoms or changes you want me to know about?",

                replies: [
                    "Yes",
                    "No",
                    "Not sure",
                    "Prefer not to say"
                ]
            },

            {
                id: "goal",

                text:
                    "What would you most like help understanding?",

                replies: [
                    "What PCOS means",
                    "Whether I should see a doctor",
                    "What to ask a doctor",
                    "Something else"
                ]
            }

        ],

        reproductive: [

            {
                id: "concern",

                text:
                    "Can you describe the reproductive-health concern in your own words?",

                replies: [
                    "Pain",
                    "Discharge or itching",
                    "Bleeding",
                    "Possible pregnancy",
                    "Something else"
                ]
            },

            {
                id: "duration",

                text:
                    "When did you first notice it?",

                replies: [
                    "Today",
                    "A few days ago",
                    "1–2 weeks ago",
                    "More than 2 weeks ago",
                    "Not sure"
                ]
            },

            {
                id: "severity",

                text:
                    "How severe is it right now?",

                replies: [
                    "Mild",
                    "Moderate",
                    "Severe",
                    "Not sure"
                ]
            },

            {
                id: "redFlags",

                text:
                    "Are you having severe pain, fainting, fever, or heavy bleeding?",

                replies: [
                    "No",
                    "Yes",
                    "Not sure",
                    "Prefer not to say"
                ]
            },

            {
                id: "pregnancy",

                text:
                    "Is pregnancy possible or are you currently pregnant?",

                replies: [
                    "No",
                    "Yes",
                    "Not sure",
                    "Prefer not to say"
                ]
            },

            {
                id: "goal",

                text:
                    "What would be most useful for you right now?",

                replies: [
                    "Understand what may matter",
                    "Know when to seek care",
                    "Prepare for a doctor",
                    "Just ask a question"
                ]
            }

        ],

        doctor: [

            {
                id: "appointment",

                text:
                    "What are you preparing to discuss with your healthcare professional?",

                replies: [
                    "A new symptom",
                    "A recurring problem",
                    "Test results",
                    "Medication question",
                    "Something else"
                ]
            },

            {
                id: "duration",

                text:
                    "How long has the concern been present?",

                replies: [
                    "A few days",
                    "A few weeks",
                    "A few months",
                    "Longer",
                    "Not sure"
                ]
            },

            {
                id: "severity",

                text:
                    "How much is it affecting your daily life?",

                replies: [
                    "A little",
                    "Moderately",
                    "A lot",
                    "Not sure"
                ]
            },

            {
                id: "safety",

                text:
                    "Are there any urgent symptoms that you are worried about right now?",

                replies: [
                    "No",
                    "Yes",
                    "Not sure",
                    "Prefer not to say"
                ]
            },

            {
                id: "goal",

                text:
                    "What would you like to get from the appointment?",

                replies: [
                    "Understand the cause",
                    "Know what tests may matter",
                    "Discuss treatment options",
                    "Get reassurance",
                    "Something else"
                ]
            },

            {
                id: "questions",

                text:
                    "Is there anything specific you are afraid of or unsure about?",

                replies: [
                    "Yes",
                    "No",
                    "Not sure",
                    "Prefer not to say"
                ]
            }

        ],

        general: [

            {
                id: "concern",

                text:
                    "Tell me a little more about what is worrying you.",

                replies: [
                    "A symptom",
                    "A health result",
                    "A body change",
                    "A question",
                    "Something else"
                ]
            },

            {
                id: "duration",

                text:
                    "When did you first notice this?",

                replies: [
                    "Today",
                    "A few days ago",
                    "A few weeks ago",
                    "Months ago",
                    "Not sure"
                ]
            },

            {
                id: "severity",

                text:
                    "How much is it affecting you right now?",

                replies: [
                    "A little",
                    "Moderately",
                    "A lot",
                    "Not sure"
                ]
            },

            {
                id: "safety",

                text:
                    "Are you having severe pain, fainting, trouble breathing, or heavy bleeding?",

                replies: [
                    "No",
                    "Yes",
                    "Not sure",
                    "Prefer not to say"
                ]
            },

            {
                id: "other",

                text:
                    "Have you noticed any other important changes?",

                replies: [
                    "Yes",
                    "No",
                    "Not sure",
                    "Prefer not to say"
                ]
            },

            {
                id: "goal",

                text:
                    "What would you like help with most?",

                replies: [
                    "Understand it",
                    "Know my next step",
                    "Prepare for a doctor",
                    "Ask a health question"
                ]
            }

        ]

    };

    const translations = {

        english: {

            greeting:
                "Hi! I'm SAKHI. 🌸 I'm here to help you understand your concern and think about a safe next step. You don't need medical words.",

            topic:
                "What would you like help with today?"

        },

        telugu: {

            greeting:
                "హాయ్! నేను SAKHI. 🌸 మీ health concern ని అర్థం చేసుకోవడానికి, safe next step గురించి guide చేయడానికి నేను ఇక్కడ ఉన్నాను. Medical words అవసరం లేదు.",

            topic:
                "ఈరోజు మీకు ఏ విషయంలో help కావాలి?"

        },

        tenglish: {

            greeting:
                "Hi! Nenu SAKHI. 🌸 Mee health concern ni simple ga understand cheskoni, safe next step enti ani guide cheyyadaniki help chestha. Medical words avasaram ledu.",

            topic:
                "Ivala meeku deni gurinchi help kavali?"

        }

    };

    function getLanguage() {

        return languageSelect?.value || "english";

    }

    function addMessage(sender, text, type = "ai") {

        const row =
            document.createElement("div");

        row.className =
            `chat-row ${type}`;

        if (type === "ai") {

            row.innerHTML = `

                <div class="ai-mini-avatar">
                    ✦
                </div>

                <div class="chat-bubble">

                    <div class="chat-sender">
                        ${sender}
                    </div>

                    <div>
                        ${formatText(text)}
                    </div>

                    <div class="chat-time">
                        ${currentTime()}
                    </div>

                </div>
            `;

        } else {

            row.innerHTML = `

                <div class="chat-bubble">

                    <div class="chat-sender">
                        ${sender}
                    </div>

                    <div>
                        ${formatText(text)}
                    </div>

                    <div class="chat-time">
                        ${currentTime()}
                    </div>

                </div>
            `;

        }

        chatMessages.appendChild(row);

        scrollChat();

    }

    function formatText(text) {

        return String(text)

            .replace(/&/g, "&amp;")

            .replace(/</g, "&lt;")

            .replace(/>/g, "&gt;")

            .replace(/\n/g, "<br>");

    }

    function currentTime() {

        return new Date().toLocaleTimeString(

            [],

            {
                hour: "2-digit",
                minute: "2-digit"
            }

        );

    }

    function showTyping() {

        const row =
            document.createElement("div");

        row.className =
            "chat-row ai";

        row.id =
            "typingIndicator";

        row.innerHTML = `

            <div class="ai-mini-avatar">
                ✦
            </div>

            <div class="chat-bubble typing-bubble">

                <span></span>
                <span></span>
                <span></span>

            </div>

        `;

        chatMessages.appendChild(row);

        scrollChat();

    }

    function hideTyping() {

        document
            .getElementById("typingIndicator")
            ?.remove();

    }

    function scrollChat() {

        requestAnimationFrame(() => {

            chatMessages.scrollTop =
                chatMessages.scrollHeight;

        });

    }

    function setQuickReplies(options = []) {

        quickReplies.innerHTML = "";

        options.forEach(option => {

            const button =
                document.createElement("button");

            button.type = "button";

            button.className =
                "quick-reply";

            button.textContent =
                option;

            button.addEventListener(
                "click",
                () => {

                    submitAnswer(option);

                }
            );

            quickReplies.appendChild(button);

        });

    }

    function updateProgress() {

        const number =
            Math.min(
                state.questionIndex + 1,
                TOTAL_QUESTIONS
            );

        const percentage =
            Math.min(
                (number / TOTAL_QUESTIONS) * 100,
                100
            );

        if (state.finished) {

            progressLabel.textContent =
                "Conversation complete";

        } else {

            progressLabel.textContent =
                `Question ${number} of ${TOTAL_QUESTIONS}`;

        }

        progressBar.style.width =
            `${percentage}%`;

    }

    function chooseTopic(topic, label) {

        state.topic =
            topic;

        state.questionIndex =
            0;

        state.answers.topic =
            label;

        addMessage(
            "YOU",
            label,
            "user"
        );

        setTimeout(() => {

            showTyping();

            setTimeout(() => {

                hideTyping();

                const language =
                    getLanguage();

                addMessage(
                    "SAKHI AI",
                    `${translations[language].greeting}<br><br>${translations[language].topic}`
                );

                askCurrentQuestion();

            }, 650);

        }, 120);

    }

    function askCurrentQuestion() {

        const list =
            topicQuestions[state.topic]
            || topicQuestions.general;

        const question =
            list[state.questionIndex];

        if (!question) {

            finishConversation();

            return;

        }

        state.currentQuestion =
            question;

        updateProgress();

        setTimeout(() => {

            addMessage(
                "SAKHI AI",
                question.text
            );

            setQuickReplies(
                question.replies
            );

        }, 450);

    }

    function submitAnswer(answer) {

        if (
            !answer ||
            state.finished
        ) {

            return;

        }

        addMessage(
            "YOU",
            answer,
            "user"
        );

        state.history.push({

            question:
                state.currentQuestion?.text || "",

            answer:
                answer

        });

        if (state.currentQuestion) {

            state.answers[
                state.currentQuestion.id
            ] = answer;

        }

        quickReplies.innerHTML = "";

        userInput.value = "";

        userInput.focus();

        checkForRedFlags(
            answer,
            state.currentQuestion?.id
        );

        state.questionIndex++;

        showTyping();

        setTimeout(() => {

            hideTyping();

            if (
                state.questionIndex >=
                TOTAL_QUESTIONS
            ) {

                finishConversation();

            } else {

                addMessage(
                    "SAKHI AI",
                    adaptiveTransition()
                );

                askCurrentQuestion();

            }

        }, 800);

    }

    function adaptiveTransition() {

        const question =
            state.currentQuestion?.text
            || "";

        const lower =
            question.toLowerCase();

        if (
            lower.includes("pregnancy")
        ) {

            return (
                "Thanks for sharing that. " +
                "This detail can change what information is useful, " +
                "so I want to check it gently."
            );

        }

        if (
            lower.includes("severe") ||
            lower.includes("urgent") ||
            lower.includes("warning")
        ) {

            return (
                "Thank you. Before we continue, " +
                "I want to make sure we don't miss " +
                "anything that may need prompt attention."
            );

        }

        return (
            "Thanks for telling me. 🌷 " +
            "That helps me decide what to ask next."
        );

    }

    function checkForRedFlags(
        answer,
        questionId
    ) {

        const text =
            String(answer).toLowerCase();

        const redFlagPatterns = [

            "faint",

            "fainted",

            "passing out",

            "can't breathe",

            "cannot breathe",

            "trouble breathing",

            "difficulty breathing",

            "severe pain",

            "unbearable pain",

            "very heavy bleeding",

            "heavy bleeding",

            "chest pain"

        ];

        if (
            redFlagPatterns.some(
                pattern =>
                    text.includes(pattern)
            )
        ) {

            state.redFlag =
                true;

        }

        if (
            questionId === "redFlags" &&
            /yes/i.test(text)
        ) {

            state.redFlag =
                true;

        }

        if (
            questionId === "safety" &&
            /yes/i.test(text)
        ) {

            state.redFlag =
                true;

        }

    }

    function finishConversation() {

        state.finished =
            true;

        quickReplies.innerHTML = "";

        updateProgress();

        showTyping();

        setTimeout(() => {

            hideTyping();

            if (state.redFlag) {

                addMessage(

                    "SAKHI AI",

                    "Thank you for telling me. Because you mentioned a possible warning sign, it would be safer to seek prompt medical attention rather than relying on this chat. If symptoms are severe or rapidly worsening, use your local emergency service."

                );

            } else {

                addMessage(

                    "SAKHI AI",

                    "Thank you for sharing that with me. 🌸 I have enough information to give you a safer summary. I won't diagnose you, but I can help you think about a reasonable next step."

                );

            }

            buildResults();

            results?.classList.remove(
                "hidden"
            );

            results?.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }, 900);

    }

    function buildResults() {

        const topicLabel =
            state.answers.topic
            || "your health concern";

        const answersText =
            Object.entries(
                state.answers
            )

            .filter(
                ([key]) =>
                    key !== "topic"
            )

            .map(
                ([key, value]) =>
                    `${prettyKey(key)}: ${value}`
            )

            .join(" • ");

        if (state.redFlag) {

            safetyTitle.textContent =
                "Possible warning signs mentioned";

            safetyMessage.textContent =
                "Some information you provided may warrant prompt professional attention. This prototype cannot determine how serious a symptom is. If symptoms are severe, rapidly worsening, or you feel unsafe, seek urgent medical care.";

        } else {

            safetyTitle.textContent =
                "No obvious urgent warning identified";

            safetyMessage.textContent =
                "Based only on the information shared in this conversation, no obvious urgent warning signal was identified. This is not a diagnosis, and symptoms can change.";

        }

        understanding.innerHTML = `

            <p>

                <strong>
                    You told SAKHI:
                </strong>

                ${escapeHtml(topicLabel)}.

            </p>

            <p>

                ${escapeHtml(
                    explanationText()
                )}

            </p>

        `;

        known.textContent =
            answersText
            || "Your answers will appear here.";

        nextTitle.textContent =
            state.redFlag
                ? "Consider prompt professional care"
                : "Consider a healthcare conversation";

        nextMessage.textContent =
            state.redFlag

                ? "Because a possible warning sign was mentioned, consider getting professional medical attention promptly instead of waiting for the chat to explain the cause."

                : "If the concern continues, returns, worsens, or is affecting your daily life, consider speaking with a qualified healthcare professional. Bring the summary and questions below.";

        doctorQuestions.innerHTML =
            createDoctorQuestions();

        summary.innerHTML =
            createSummary();

    }

    function explanationText() {

        const style =
            explanationStyle?.value
            || "simple";

        if (style === "detailed") {

            return (
                "The conversation collected information " +
                "about when the change started, how it affects you, " +
                "and whether warning signs or related symptoms were present. " +
                "These details can help a qualified professional decide " +
                "what to ask or examine next."
            );

        }

        if (style === "standard") {

            return (
                "The conversation collected the main change, " +
                "timing, impact, and safety information you shared."
            );

        }

        return (
            "I collected the main change, timing, " +
            "impact, and safety information you shared."
        );

    }

    function prettyKey(key) {

        return key

            .replace(
                /([A-Z])/g,
                " $1"
            )

            .replace(
                /^./,
                char =>
                    char.toUpperCase()
            );

    }

    function createDoctorQuestions() {

        const questions = [

            "What could be contributing to the symptoms I described?",

            "Do you recommend any examination or tests based on my history?",

            "What warning signs should make me seek care sooner?",

            "What should I track before my next appointment?"

        ];

        return questions

            .map(
                (question, index) => `

                    <div class="doctor-question-item">

                        <span>
                            ${index + 1}
                        </span>

                        <p>
                            ${escapeHtml(question)}
                        </p>

                    </div>

                `
            )

            .join("");

    }

    function createSummary() {

        const rows =
            state.history

                .map(
                    item => `

                        <div class="summary-row">

                            <strong>
                                ${escapeHtml(
                                    item.question
                                )}
                            </strong>

                            <span>
                                ${escapeHtml(
                                    item.answer
                                )}
                            </span>

                        </div>

                    `
                )

                .join("");

        return `

            <div class="summary-intro">

                <strong>
                    Topic:
                </strong>

                ${escapeHtml(
                    state.answers.topic
                    || "Health concern"
                )}

            </div>

            ${rows}

        `;

    }

    function escapeHtml(value) {

        return String(value)

            .replace(
                /&/g,
                "&amp;"
            )

            .replace(
                /</g,
                "&lt;"
            )

            .replace(
                />/g,
                "&gt;"
            )

            .replace(
                /"/g,
                "&quot;"
            )

            .replace(
                /'/g,
                "&#039;"
            );

    }

    function resetSession() {

        state.topic = null;

        state.answers = {};

        state.history = [];

        state.questionIndex = 0;

        state.currentQuestion = null;

        state.finished = false;

        state.redFlag = false;

        chatMessages.innerHTML = "";

        quickReplies.innerHTML = "";

        userInput.value = "";

        results?.classList.add(
            "hidden"
        );

        addMessage(

            "SAKHI AI",

            translations[
                getLanguage()
            ].greeting

        );

        setTimeout(() => {

            addMessage(

                "SAKHI AI",

                translations[
                    getLanguage()
                ].topic

            );

            setQuickReplies([

                "🌸 Periods & Cycles",

                "🧬 PCOS & Hormones",

                "💗 Reproductive Health",

                "🩺 Doctor Visit",

                "💬 Something else"

            ]);

        }, 500);

        updateProgress();

    }

    function startFromQuickTopic(
        label,
        topic
    ) {

        chooseTopic(
            topic,
            label
        );

    }

    document
        .querySelectorAll(".topic-card")
        .forEach(card => {

            card.addEventListener(
                "click",
                () => {

                    const label =
                        card.querySelector(
                            "strong"
                        )?.textContent
                        || "Health concern";

                    const topicText =
                        card.dataset.topic
                        || "";

                    const lower =
                        topicText.toLowerCase();

                    let topic =
                        "general";

                    if (
                        lower.includes(
                            "period"
                        )
                    ) {

                        topic =
                            "periods";

                    } else if (
                        lower.includes(
                            "pcos"
                        )
                    ) {

                        topic =
                            "pcos";

                    } else if (
                        lower.includes(
                            "reproductive"
                        )
                    ) {

                        topic =
                            "reproductive";

                    } else if (
                        lower.includes(
                            "doctor"
                        )
                    ) {

                        topic =
                            "doctor";

                    }

                    document
                        .getElementById(
                            "navigator"
                        )
                        ?.scrollIntoView({

                            behavior:
                                "smooth",

                            block:
                                "start"

                        });

                    setTimeout(() => {

                        startFromQuickTopic(
                            label,
                            topic
                        );

                    }, 450);

                }
            );

        });

    document
        .getElementById("startButton")
        ?.addEventListener(
            "click",
            () => {

                document
                    .getElementById(
                        "navigator"
                    )
                    ?.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "start"

                    });

                setTimeout(
                    resetSession,
                    500
                );

            }
        );

    quickReplies.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".quick-reply"
                );

            if (!button)
                return;

            if (!state.topic) {

                const value =
                    button.textContent.trim();

                if (
                    value.includes(
                        "Periods"
                    )
                ) {

                    startFromQuickTopic(
                        "Periods & Cycles",
                        "periods"
                    );

                } else if (
                    value.includes(
                        "PCOS"
                    )
                ) {

                    startFromQuickTopic(
                        "PCOS & Hormones",
                        "pcos"
                    );

                } else if (
                    value.includes(
                        "Reproductive"
                    )
                ) {

                    startFromQuickTopic(
                        "Reproductive Health",
                        "reproductive"
                    );

                } else if (
                    value.includes(
                        "Doctor"
                    )
                ) {

                    startFromQuickTopic(
                        "Doctor Visit",
                        "doctor"
                    );

                } else {

                    startFromQuickTopic(
                        "Something else",
                        "general"
                    );

                }

            }

        }
    );

    sendButton?.addEventListener(
        "click",
        () => {

            if (!state.topic) {

                addMessage(

                    "SAKHI AI",

                    "Please choose a topic first so I can ask the most relevant questions."

                );

                return;

            }

            const answer =
                userInput.value.trim();

            if (answer) {

                submitAnswer(
                    answer
                );

            }

        }
    );

    userInput?.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendButton.click();

            }

        }
    );

    newSessionButton?.addEventListener(
        "click",
        resetSession
    );

    languageSelect?.addEventListener(
        "change",
        () => {

            if (!state.topic) {

                resetSession();

            }

        }
    );

    copySummary?.addEventListener(
        "click",
        async () => {

            const text =
                summary?.innerText
                || "";

            try {

                await navigator.clipboard
                    .writeText(text);

                copySummary.textContent =
                    "Copied ✓";

                setTimeout(
                    () => {

                        copySummary.textContent =
                            "Copy";

                    },
                    1600
                );

            } catch {

                copySummary.textContent =
                    "Select & copy";

            }

        }
    );

    mythButton?.addEventListener(
        "click",
        () => {

            const claim =
                mythInput.value.trim();

            if (!claim) {

                mythResult
                    .classList
                    .remove("hidden");

                mythResult.textContent =
                    "Type a health claim first.";

                return;

            }

            mythResult
                .classList
                .remove("hidden");

            const lower =
                claim.toLowerCase();

            if (

                lower.includes(
                    "irregular periods"
                )

                &&

                lower.includes(
                    "pcos"
                )

            ) {

                mythResult.innerHTML = `

                    <strong>
                        Needs context 🌸
                    </strong>

                    <p>

                        Irregular periods can happen
                        for many reasons. PCOS is one
                        possible explanation, but irregular
                        cycles alone cannot establish that
                        someone has PCOS. A qualified
                        healthcare professional can consider
                        the person's history, symptoms,
                        and appropriate evaluation.

                    </p>

                `;

            } else {

                mythResult.innerHTML = `

                    <strong>
                        Let's add context.
                    </strong>

                    <p>

                        A single health claim is not enough
                        to determine what is happening for
                        one person. SAKHI should explain the
                        claim, mention uncertainty, and
                        encourage professional care when
                        appropriate.

                    </p>

                `;

            }

        }
    );

    resetSession();

});
