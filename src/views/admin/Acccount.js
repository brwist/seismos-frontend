import { Card } from 'antd';
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

// components
export default function Account() {
    const user = useSelector(state => state.authReducer.user);

    useEffect(() => {
    })
    return (
        <>
            <div style={{minHeight: "80vh"}} className="flex justify-center items-center bg-white">
                <div>
                    <Card title="User Account"  style={{width: '500px'}}>
                        <div>
                            Name: {user.username}
                        </div>
                        <div>
                            Email: {user.email}
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}