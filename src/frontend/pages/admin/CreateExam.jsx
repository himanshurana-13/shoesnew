// {"code":"rate-limited","message":"You have hit the rate limit. Please <a class=\"__boltUpgradePlan__\">Upgrade</a> to keep chatting, or you can continue coding for free in the editor.","providerLimitHit":false,"isRetryable":true}

import React, { useState } from "react";

function CreateExam() {
  const [examName, setExamName] = useState("");

  return (
    <div>
      <h2>Create Exam</h2>
      <input
        type="text"
        value={examName}
        onChange={(e) => setExamName(e.target.value)}
        placeholder="Enter exam name"
      />
    </div>
  );
}

export default CreateExam;
