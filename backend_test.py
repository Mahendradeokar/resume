import requests
import sys
import json
from datetime import datetime

class ResumeAppTester:
    def __init__(self, base_url="http://localhost:3000"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status=200, data=None, check_content=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)

            status_success = response.status_code == expected_status
            
            if status_success:
                print(f"✅ Status check passed - Expected: {expected_status}, Got: {response.status_code}")
            else:
                print(f"❌ Status check failed - Expected: {expected_status}, Got: {response.status_code}")
                return False
            
            # Content check if provided
            if check_content and status_success:
                try:
                    content_success = check_content(response)
                    if content_success:
                        print(f"✅ Content check passed")
                    else:
                        print(f"❌ Content check failed")
                    return status_success and content_success
                except Exception as e:
                    print(f"❌ Content check error: {str(e)}")
                    return False
            
            return status_success

        except Exception as e:
            print(f"❌ Request failed - Error: {str(e)}")
            return False

    def test_homepage(self):
        """Test the homepage"""
        def check_homepage_content(response):
            html = response.text
            return all(term in html for term in [
                "Resume System",
                "Mahendra Devkar",
                "Open Resume",
                "Download PDF"
            ])
        
        success = self.run_test(
            "Homepage",
            "GET",
            "",
            200,
            check_content=check_homepage_content
        )
        
        if success:
            self.tests_passed += 1
        
        return success

    def test_resume_page(self):
        """Test the resume page"""
        def check_resume_content(response):
            html = response.text
            return all(term in html for term in [
                "Mahendra Devkar",
                "Professional Experience",
                "Skills",
                "Education",
                "Fun Projects"
            ])
        
        success = self.run_test(
            "Resume Page",
            "GET",
            "mahendra-devkar",
            200,
            check_content=check_resume_content
        )
        
        if success:
            self.tests_passed += 1
        
        return success

    def test_pdf_download(self):
        """Test the PDF download link"""
        success = self.run_test(
            "PDF Download",
            "GET",
            "Mahendra_Devkar_Resume.pdf",
            200
        )
        
        if success:
            self.tests_passed += 1
        
        return success

    def run_all_tests(self):
        """Run all tests"""
        print("🚀 Starting Resume App Tests")
        
        self.test_homepage()
        self.test_resume_page()
        self.test_pdf_download()
        
        # Print results
        print(f"\n📊 Tests passed: {self.tests_passed}/{self.tests_run}")
        return self.tests_passed == self.tests_run

def main():
    tester = ResumeAppTester("http://localhost:3000")
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())