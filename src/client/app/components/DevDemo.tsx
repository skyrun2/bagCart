const DevDemo = ()=>{
    return(
        <>
            <div className="mt-6 p-4 bg-card  rounded-lg">
            <h3 className="text-sm font-semibold text-emigreen mb-2">
                Testing accounts (local dev only)
            </h3>
            <div className="text-xs text-emigreen/60 space-y-1">
                <div>
                <strong>Superadmin:</strong> superadmin@example.com /
                password123
                </div>
                <div>
                <strong>Admin:</strong> admin@example.com / password123
                </div>
                <div>
                <strong>User:</strong> user@example.com / password123
                </div>
            </div>
            <p className="text-xs text-emigreen/60 mt-2">
                Run 
                <code className="font-mono"> npm run seed</code> {" \n in "}
                <code className="font-mono">src/server</code> first.
            </p>
            </div>
        </>
    )
}

export default DevDemo