import { Upload } from "lucide-react";
import { useRef } from "react";
import { useState } from "react";

const CustomOrderSection = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    info: ''
  });
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    if (file && ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 100);

      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedFile({
          name: file.name,
          size: (file.size / 1024).toFixed(2),
          preview: e.target.result
        });
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a JPG, PNG, or WEBP image file.');
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    if (!uploadedFile) {
      alert('Please upload a reference photo');
      return;
    }
    if (!formData.name || !formData.contact) {
      alert('Please fill in your name and contact information');
      return;
    }
    alert(`Custom order submitted!\nName: ${formData.name}\nContact: ${formData.contact}\nFile: ${uploadedFile.name}`);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Custom Order
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload your reference photo and create your personalized Assamese artwork
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-teal-50 rounded-3xl shadow-xl p-8">
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Upload Reference Photo
            </label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all ${
                isDragging
                  ? 'border-teal-700 bg-teal-50'
                  : 'border-gray-300 bg-white hover:border-teal-700'
              }`}
            >
              {!uploadedFile ? (
                <div>
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-700 mb-2 font-medium">
                    Drag and drop your image here
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="text-teal-700 hover:text-teal-800 font-bold text-lg"
                  >
                    or browse files
                  </button>
                  <p className="text-xs text-gray-500 mt-3">
                    Supports: JPG, PNG, WEBP
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative inline-block">
                    <img
                      src={uploadedFile.preview}
                      alt="Preview"
                      className="max-h-64 rounded-xl shadow-lg"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="text-sm text-gray-700">
                    <p className="font-bold">{uploadedFile.name}</p>
                    <p>{uploadedFile.size} KB</p>
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-4">
                <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-teal-700 h-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2 text-center font-medium">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Contact Number *
              </label>
              <input
                type="tel"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Additional Information
              </label>
              <textarea
                value={formData.info}
                onChange={(e) => setFormData({ ...formData, info: e.target.value })}
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
                placeholder="Tell us about your requirements (size, style, frame type, etc.)"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full mt-8 bg-teal-700 text-white py-4 rounded-full hover:bg-teal-800 transition-all font-bold text-lg shadow-xl transform hover:scale-105"
          >
            Submit Custom Order
          </button>
        </div>
      </div>
    </section>
  );
};
export default CustomOrderSection;