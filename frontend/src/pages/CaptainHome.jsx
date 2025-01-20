import React, { useState, useRef, useEffect, useContext } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { SocketContext } from '../context/SocketContext';
import { CaptainContext } from '../context/CaptainContext';

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  // Handles UI changes when a ride is confirmed
  const confirmRide = () => {
    console.log('Ride confirmed:', ride);
    setConfirmRidePopupPanel(false);
    setRidePopupPanel(false);
  };

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainContext);

  useEffect(() => {
    socket.emit('join', {
      userId: captain._id,
      userType: 'captain',
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => clearInterval(locationInterval); // Cleanup the interval
  }, [socket, captain]);

  useEffect(() => {
    socket.on('new-ride', (data) => {
      setRide(data);
      setRidePopupPanel(true);
    });

    return () => {
      socket.off('new-ride'); // Cleanup socket listener
    };
  }, [socket]);

  // Confirm ride by emitting a socket event
  async function handleConfirmRide() {
    socket.emit('confirm-ride', {
      userId: captain._id,
      rideId: ride._id,
    });
  }

  useEffect(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(ridePopupPanelRef.current, {
        y: '100%',
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [ridePopupPanel]);

  useEffect(() => {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        y: '100%',
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [confirmRidePopupPanel]);

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <Link
          to="/captain-home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Background Animation"
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={handleConfirmRide} // Pass the renamed function here
        />
      </div>
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
