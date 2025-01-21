import { useState,useEffect } from "react";
import Logo from "./logo";
import EditLogoModal from "./EditLogoModal";

function LogoBox({size=80,company_website="axonator.com",task}) {
    const profile_url = task?.custom_fields?.["Profile Picture"]?.value;
    const defaultLogoSrc = `https://img.logo.dev/${company_website}?token=pk_CVR_tKaFQ0mBXPEs9bO4Pw&size=${size}`;
    
    const [logoSrc, setLogoSrc] = useState(defaultLogoSrc);
      // Function to validate a URL
    const isValidUrl = (url) => {
        try {
            new URL(url); // Validates using URL constructor
            return true;
        } catch (err) {
            return false;
        }
    };

    // Check if profile_url exists and is valid
    useEffect(() => {
        if (profile_url && isValidUrl(profile_url)) {
            // Optional: Verify URL is accessible via fetch
            fetch(profile_url, { method: "HEAD" })
                .then((res) => {
                    if (res.ok) {
                        setLogoSrc(profile_url);
                    }
                })
                .catch(() => {
                    // If fetch fails, retain the default logoSrc
                    setLogoSrc(defaultLogoSrc);
                });
        }
    }, [profile_url]);

      const [isModalOpen, setModalOpen] = useState(false);
    
      const handleEditClick = () => setModalOpen(true);
      const handleModalClose = () => setModalOpen(false);
    return(
        <div className="d-flex col-4 p-0" id="titebox">
            <Logo src={logoSrc} onEditClick={handleEditClick} size={size}/>
            {isModalOpen && <EditLogoModal task={task} show={isModalOpen} onClose={handleModalClose} />}
        </div>
    )
}

export default LogoBox;