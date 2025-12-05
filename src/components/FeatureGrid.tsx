const FeatureGrid = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
                <div className="text-2xl font-bold mb-2 text-white">CS</div>
                <h3 className="text-white font-semibold mb-2">Connect Social Platforms</h3>
                <p className="text-gray-300 text-sm">One-tap connect for Instagram, YouTube, and X with secure read-only analytics.</p>
            </div>
            <div className="text-center">
                <div className="text-2xl font-bold mb-2 text-white">SG</div>
                <h3 className="text-white font-semibold mb-2">Smart Guidance</h3>
                <p className="text-gray-300 text-sm">Easy-to-understand suggestions that tell creators exactly what to do next.</p>
            </div>
            <div className="text-center">
                <div className="text-2xl font-bold mb-2 text-white">TE</div>
                <h3 className="text-white font-semibold mb-2">Trend Engine</h3>
                <p className="text-gray-300 text-sm">Detects reels and sounds gaining momentum before they go viral.</p>
            </div>
        </div>
    );
};

export default FeatureGrid;
