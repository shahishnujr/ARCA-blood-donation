import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Droplets, Heart } from 'lucide-react';

interface FormData {
  [key: string]: string | boolean | null;
}

function App() {
  const [formData, setFormData] = useState<FormData>({});
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const isEligible = () => {
    const disqualifyingConditions = [
      !formData.age,
      !formData.weight,
      formData.recentIllness,
      formData.chronicConditions,
      formData.infectiousDisease,
      formData.bleedingDisorders,
      formData.recentAlcohol,
      formData.recentDrugs,
      formData.recentTattoo,
      formData.highRiskActivities,
      formData.recentTravel,
      formData.recentDonation
    ];

    return !disqualifyingConditions.some(condition => condition);
  };
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 transform hover:scale-105 transition-transform duration-300">
          <div className="flex justify-center mb-4">
            <Droplets className="text-red-600 w-16 h-16 animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold text-red-600 mb-2">
            Blood Donation Eligibility Check
          </h1>
          <p className="text-gray-600">Help save lives by checking if you're eligible to donate blood</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="question-group">
            <h2 className="section-title">
              <Heart className="inline-block mr-2 text-red-600" />
              Basic Information
            </h2>
            
            <div className="question-box">
              <label>
                <span className="question-text">Are you between 18 and 65 years of age?</span>
                <select 
                  onChange={(e) => handleInputChange('age', e.target.value === 'yes')}
                  className="form-select"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
              {formData.age && (
                <input
                  type="number"
                  placeholder="Enter your exact age"
                  className="form-input mt-2"
                  onChange={(e) => handleInputChange('exactAge', e.target.value)}
                />
              )}
            </div>

            <div className="question-box">
              <label>
                <span className="question-text">Do you weigh at least 50 kg (110 lbs)?</span>
                <select 
                  onChange={(e) => handleInputChange('weight', e.target.value === 'yes')}
                  className="form-select"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
            </div>
          </div>

          {/* Health Status */}
          <div className="question-group">
            <h2 className="section-title">Health Status</h2>
            
            <div className="question-box">
              <label>
                <span className="question-text">Have you experienced any fever, cold, flu, or other illnesses in the past 7 days?</span>
                <select 
                  onChange={(e) => handleInputChange('recentIllness', e.target.value === 'yes')}
                  className="form-select"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
            </div>

            <div className="question-box">
              <label>
                <span className="question-text">Do you have any chronic medical conditions?</span>
                <select 
                  onChange={(e) => handleInputChange('chronicConditions', e.target.value === 'yes')}
                  className="form-select"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
              {formData.chronicConditions === 'yes' && (
                <label className="mt-2 block">
                  <span className="question-text">Is the condition well-managed with treatment?</span>
                  <select 
                    onChange={(e) => handleInputChange('conditionManaged', e.target.value === 'yes')}
                    className="form-select"
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </label>
              )}
            </div>

            <div className="question-box">
              <label>
                <span className="question-text">Are you currently taking any prescription medications?</span>
                <select 
                  onChange={(e) => handleInputChange('medications', e.target.value === 'yes')}
                  className="form-select"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
              {formData.medications === 'yes' && (
                <textarea
                  placeholder="Please list your medications (optional)"
                  className="form-input mt-2"
                  onChange={(e) => handleInputChange('medicationList', e.target.value)}
                />
              )}
            </div>
          </div>

          {/* Medical History */}
          <div className="question-group">
            <h2 className="section-title">Medical History</h2>
            
            <div className="question-box">
              <label>
                <span className="question-text">Have you ever tested positive for HIV, Hepatitis B, or Hepatitis C?</span>
                <select 
                  onChange={(e) => handleInputChange('infectiousDisease', e.target.value === 'yes')}
                  className="form-select"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
            </div>

            <div className="question-box">
              <label>
                <span className="question-text">Have you received any vaccinations in the past 4 weeks?</span>
                <select 
                  onChange={(e) => handleInputChange('recentVaccination', e.target.value === 'yes')}
                  className="form-select"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
            </div>

            <div className="question-box">
              <label>
                <span className="question-text">Do you have any bleeding disorders?</span>
                <select 
                  onChange={(e) => handleInputChange('bleedingDisorders', e.target.value === 'yes')}
                  className="form-select"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
            </div>
          </div>

          {/* Lifestyle Factors */}
          <div className="question-group">
            <h2 className="section-title">Lifestyle Factors</h2>
            
            <div className="question-box">
              <label>
                <span className="question-text">Have you consumed alcohol in the past 24-48 hours?</span>
                <select 
                  onChange={(e) => handleInputChange('recentAlcohol', e.target.value === 'yes')}
                  className="form-select"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
            </div>

            <div className="question-box">
              <label>
                <span className="question-text">Have you used any recreational drugs in the past 6 months?</span>
                <select 
                  onChange={(e) => handleInputChange('recentDrugs', e.target.value === 'yes')}
                  className="form-select"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
            </div>

            <div className="question-box">
              <label>
                <span className="question-text">Have you had a tattoo or piercing in the past 6 months?</span>
                <select 
                  onChange={(e) => handleInputChange('recentTattoo', e.target.value === 'yes')}
                  className="form-select"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
            </div>
          </div>

          {/* Travel and Risk Assessment */}
          <div className="question-group">
            <h2 className="section-title">Travel and Risk Assessment</h2>
            
            <div className="question-box">
              <label>
                <span className="question-text">Have you traveled to a high-risk area in the past 12 months?</span>
                <select 
                  onChange={(e) => handleInputChange('recentTravel', e.target.value === 'yes')}
                  className="form-select"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
            </div>

            <div className="question-box">
              <label>
                <span className="question-text">Have you eaten in the last four hours?</span>
                <select 
                  onChange={(e) => handleInputChange('highRiskActivities', e.target.value === 'no')}
                  className="form-select"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
            </div>
          </div>

          {/* Previous Donations */}
          <div className="question-group">
            <h2 className="section-title">Previous Donations</h2>
            
            <div className="question-box">
              <label>
                <span className="question-text">Have you donated blood before?</span>
                <select 
                  onChange={(e) => handleInputChange('previousDonation', e.target.value === 'yes')}
                  className="form-select"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
              {formData.previousDonation === 'yes' && (
                <input
                  type="date"
                  className="form-input mt-2"
                  onChange={(e) => handleInputChange('lastDonationDate', e.target.value)}
                />
              )}
            </div>

            <div className="question-box">
              <label>
                <span className="question-text">Have you donated blood in the past 8-12 weeks?</span>
                <select 
                  onChange={(e) => handleInputChange('recentDonation', e.target.value === 'yes')}
                  className="form-select"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-12">
            <button
              type="submit"
              className="submit-button"
            >
              Check Eligibility
            </button>
          </div>
        </form>

        {/* Results Section */}
{showResults && (
  <div className={`results-card ${isEligible() ? 'eligible' : 'ineligible'}`}>
    <div className="flex items-center gap-3">
      <AlertCircle className={isEligible() ? 'text-green-600' : 'text-red-600'} />
      <h3 className={`text-xl font-semibold ${isEligible() ? 'text-green-600' : 'text-red-600'}`}>
        {isEligible() ? 'You are eligible to donate blood!' : 'You are currently not eligible to donate blood'}
      </h3>
    </div>
    <p className="mt-2 text-gray-700">
      {isEligible() 
        ? 'Please proceed to your nearest blood donation center.'
        : 'Please review the requirements and try again when you meet all criteria.'}
    </p>
    {isEligible() && (
      <button
      className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 justify-center"
      onClick={() => navigate('/schedule')} // Navigate to the Schedule Appointment page
    >Submit</button>
    )}
  </div>
)}
      </div>
    </div>
  );
}

export default App;