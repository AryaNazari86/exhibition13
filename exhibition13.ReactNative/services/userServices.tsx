export async function handleRegister(username, firstName, lastName, password, bio, profile_picture) {
    var data = new FormData();
    data.append('username', username);
    data.append('first_name', firstName);
    data.append('last_name', lastName);
    data.append('password', password);
    if (bio != null) {
        data.append('bio', bio);
    }
    if (profile_picture != null) {
        data.append('profile_picture', profile_picture);
    }

    try {
        const response = await fetch('http://192.168.0.147:8000/Account/SignUp/?format=json',
            {
                method: 'post',
                body: data,
            }
        );
    } catch (error) {
        console.error(error);
    }
}