import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const getDefaultAssessments = (userName) => [];

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        const storedAssessments = localStorage.getItem(`diarisk_user_data_${parsedUser.email}`);
        if (storedAssessments) {
          setAssessments(JSON.parse(storedAssessments));
        } else {
          setAssessments([]);
          localStorage.setItem(`diarisk_user_data_${parsedUser.email}`, JSON.stringify([]));
        }
      }
    } catch (err) {
      console.error('Failed to load user session', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userObj) => {
    setUser(userObj);
    localStorage.setItem('currentUser', JSON.stringify(userObj));
    
    const storedAssessments = localStorage.getItem(`diarisk_user_data_${userObj.email}`);
    if (storedAssessments) {
      setAssessments(JSON.parse(storedAssessments));
    } else {
      setAssessments([]);
      localStorage.setItem(`diarisk_user_data_${userObj.email}`, JSON.stringify([]));
    }
  };

  const logout = () => {
    setUser(null);
    setAssessments([]);
    localStorage.removeItem('currentUser');
  };

  const addAssessment = (formData, riskScore, apiResponse) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateObj = new Date();
    const formattedDate = `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
    
    const calculatedHealth = Math.round(Math.max(100 - (riskScore * 1.5), 10));
    
    let status = 'Baseline';
    if (assessments.length > 0) {
      const prev = assessments[0];
      if (riskScore < prev.risk) {
        status = 'Improved';
      } else if (riskScore > prev.risk) {
        status = 'Increased Risk';
      } else {
        status = 'Stable';
      }
    }
    
    const parsedBmi = parseFloat(formData.bmi) || 25.0;
    let bmiStatus = 'Optimal';
    if (parsedBmi >= 30) bmiStatus = 'Moderate Risk';
    else if (parsedBmi >= 25) bmiStatus = 'Needs Improvement';

    const exerciseStatus = formData.exercise === 'yes' ? 'Optimal' : 'Needs Improvement';

    let smokingStatus = 'Optimal';
    if (formData.smoking === 'current') smokingStatus = 'Moderate Risk';
    else if (formData.smoking === 'former') smokingStatus = 'Needs Improvement';

    let alcoholStatus = 'Optimal';
    if (formData.alcohol === 'heavy') alcoholStatus = 'Needs Improvement';
    else if (formData.alcohol === 'moderate') alcoholStatus = 'Normal';

    let generalHealthStatus = 'Optimal';
    if (formData.generalHealth === 'poor') generalHealthStatus = 'Moderate Risk';
    else if (formData.generalHealth === 'fair') generalHealthStatus = 'Needs Improvement';
    else if (formData.generalHealth === 'good') generalHealthStatus = 'Normal';
    
    const factors = [
      {
        name: 'Body Mass Index (BMI)',
        value: `${parsedBmi} kg/m²`,
        status: bmiStatus
      },
      {
        name: 'Physical Activity',
        value: formData.exercise === 'yes' ? 'Exercises Regularly' : 'No Regular Exercise',
        status: exerciseStatus
      },
      {
        name: 'Smoking Status',
        value: formData.smoking === 'never' ? 'Never Smoked' : formData.smoking === 'former' ? 'Former Smoker' : 'Current Smoker',
        status: smokingStatus
      },
      {
        name: 'Alcohol Consumption',
        value: formData.alcohol === 'none' ? 'None or Occasional' : formData.alcohol === 'moderate' ? 'Moderate' : 'Frequent / Heavy',
        status: alcoholStatus
      },
      {
        name: 'General Health Rating',
        value: formData.generalHealth ? formData.generalHealth.replace('_', ' ').toUpperCase() : 'N/A',
        status: generalHealthStatus
      }
    ];

    const newAssessment = {
      date: formattedDate,
      risk: riskScore,
      health: calculatedHealth,
      status: status,
      bmi: parsedBmi,
      factors: factors,
      recommendations: apiResponse?.recommendations || [],
      riskCategory: apiResponse?.risk_category || (riskScore < 25 ? 'Low Risk' : riskScore < 55 ? 'Moderate Risk' : 'High Risk')
    };

    const updated = [newAssessment, ...assessments];
    setAssessments(updated);
    if (user) {
      localStorage.setItem(`diarisk_user_data_${user.email}`, JSON.stringify(updated));
    }
  };

  const getTrendData = () => {
    if (assessments.length === 0) return [];
    
    const sorted = [...assessments].reverse();
    
    return sorted.map(a => {
      const parts = a.date.split(' ');
      let formattedDateLabel = a.date;
      if (parts.length >= 2) {
        formattedDateLabel = `${parts[0]} ${parts[1].replace(',', '')}`;
      }
      
      return {
        date: formattedDateLabel,
        riskScore: a.risk,
        risk: a.risk,
        bmi: a.bmi || 25.0,
        healthScore: a.health,
        health: a.health
      };
    });
  };

  return (
    <UserContext.Provider value={{ user, assessments, loading, login, logout, addAssessment, getTrendData }}>
      {children}
    </UserContext.Provider>
  );
};
