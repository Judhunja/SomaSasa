/**
 * Test script to verify AI and Supabase integrations
 * Run this in the browser console to test functionality
 */

// Test AI Integration
async function testAI() {
  console.log('🤖 Testing AI Integration...');
  
  try {
    // Import the AI client
    const { aiClient } = await import('/src/lib/aiClient.js');
    
    // Test a simple question
    const response = await aiClient.ask("What is 2 + 2?", {
      locale: 'en',
      subject: 'mathematics'
    });
    
    console.log('✅ AI Response received:', response);
    
    if (response && response.answer) {
      console.log('✅ AI Integration: SUCCESS');
      console.log('📝 Answer:', response.answer);
      return true;
    } else {
      console.log('❌ AI Integration: Failed - No answer received');
      return false;
    }
  } catch (error) {
    console.log('❌ AI Integration: ERROR -', error.message);
    return false;
  }
}

// Test Supabase Integration
async function testSupabase() {
  console.log('🗄️ Testing Supabase Integration...');
  
  try {
    // Import the Supabase client
    const { supabase } = await import('/src/lib/supabase.js');
    
    // Test connection with a simple query
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    if (error) {
      if (error.code === '42P01') {
        console.log('✅ Supabase Connection: SUCCESS (tables need to be created)');
        console.log('ℹ️ Database connected but schema not yet initialized');
        return true;
      } else {
        console.log('❌ Supabase Integration: ERROR -', error.message);
        return false;
      }
    } else {
      console.log('✅ Supabase Integration: SUCCESS');
      console.log('📊 Query result:', data);
      return true;
    }
  } catch (error) {
    console.log('❌ Supabase Integration: ERROR -', error.message);
    return false;
  }
}

// Test Environment Variables
function testEnvironment() {
  console.log('🔧 Testing Environment Variables...');
  
  const envVars = {
    'VITE_SUPABASE_URL': import.meta.env.VITE_SUPABASE_URL,
    'VITE_SUPABASE_ANON_KEY': import.meta.env.VITE_SUPABASE_ANON_KEY,
    'VITE_AI_PROVIDER': import.meta.env.VITE_AI_PROVIDER,
    'VITE_AI_KEY': import.meta.env.VITE_AI_KEY
  };
  
  let allGood = true;
  
  Object.entries(envVars).forEach(([key, value]) => {
    if (value) {
      console.log(`✅ ${key}: Set`);
    } else {
      console.log(`❌ ${key}: Missing`);
      allGood = false;
    }
  });
  
  return allGood;
}

// Run all tests
async function runAllTests() {
  console.log('🚀 Starting SomaNow Integration Tests...');
  console.log('==========================================');
  
  const envOk = testEnvironment();
  console.log('');
  
  const supabaseOk = await testSupabase();
  console.log('');
  
  const aiOk = await testAI();
  console.log('');
  
  console.log('==========================================');
  console.log('📋 Test Results Summary:');
  console.log(`Environment Variables: ${envOk ? '✅' : '❌'}`);
  console.log(`Supabase Integration: ${supabaseOk ? '✅' : '❌'}`);
  console.log(`AI Integration: ${aiOk ? '✅' : '❌'}`);
  
  const allPassed = envOk && supabaseOk && aiOk;
  console.log(`Overall Status: ${allPassed ? '✅ ALL SYSTEMS GO!' : '❌ Some issues detected'}`);
  
  return { envOk, supabaseOk, aiOk, allPassed };
}

// Export functions for manual testing
window.testAI = testAI;
window.testSupabase = testSupabase;
window.testEnvironment = testEnvironment;
window.runAllTests = runAllTests;

// Auto-run tests
runAllTests();
