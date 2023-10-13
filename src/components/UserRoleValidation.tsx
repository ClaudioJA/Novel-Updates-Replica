import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function UserRoleManagement() {
  useEffect(() => {
    
    const userRole = Cookies.get("userRole");

    if(userRole != '1'){
        window.location.href = '/';
    }

  }, []);

  return (
    <div>
    </div>
  );
}

export default UserRoleManagement;