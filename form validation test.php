<?php
// Initialize variables for error messages
$fnameErr = $lnameErr = $dobErr = "";
$successMsg = "";

// Check if form is submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $isValid = true;

    // 4. Validation: Check if fields are empty
    if(empty($_POST["firstname"])) {
        $fnameErr = "First name is required";
        $isValid = false;
    } else{
      $fname = $_POST["firstname"];
    }

    if (empty($_POST["lastname"])) {
        $lnameErr = "Last name is required";
        $isValid = false;
    } else {
        $lname = $_POST["lastname"];
    }

    if (empty($_POST["dob"])) {
        $dobErr = "Date of birth is required";
        $isValid = false;
    } else {
        $dob = $_POST["dob"];
    }

    // If all inputs are valid
    if ($isValid) {
        // 3. Create a cookie (saves info for 1 hour)
        setcookie("last_student", $fname . " " . $lname, time() + 3600, "/");

        // 5. Insert into Database (Assumed credentials)
        $conn = new mysqli("localhost", "root", "", "school_db");

        if ($conn->connect_error) { // Check connection
            $successMsg = "Database connection failed.";
        } else {
            $stmt = $conn->prepare("INSERT INTO studentsInfo (first_name, last_name, dob) VALUES (?, ?, ?)"); // Prepare statement for security
            $stmt->bind_param("sss", $fname, $lname, $dob);
            
            if ($stmt->execute()) {
                $successMsg = "Data saved successfully!";
            }
            $stmt->close();
            $conn->close();
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Student Info Form</title>
    <style>
        /* 2. CSS Styling */
        body { font-family: "Times New Roman", serif; }
        .outer-box {
            border: 2px solid #000;
            padding: 30px;
            width: 500px;
            margin: 20px auto;
        }
        h1 { margin-top: 0; font-weight: bold; font-size: 2.5em; }
        .row { margin-bottom: 15px; display: flex; align-items: center; }
        label { width: 120px; font-weight: bold; font-size: 1.1em; }
        input[type="text"], input[type="date"] {
            padding: 3px;
            width: 250px;
            border: 1px solid #000;
        }
        .req { color: red; margin: 0 5px; font-weight: bold; }
        .error-text { color: red; font-size: 0.85em; font-style: italic; }
        .submit-btn {
            background-color: #e1e1e1;
            border: 1px solid #767676;
            padding: 2px 10px;
            cursor: pointer;
            box-shadow: 1px 1px 2px #888;
        }
        .success { color: green; font-weight: bold; text-align: center; }
    </style>
</head>
<body>

    <div class="outer-box">
        <h1>Student Info</h1>
        
        <?php if ($successMsg) echo "<p class='success'>$successMsg</p>"; ?>

        <form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
            
            <div class="row">
                <label>First name:</label>
                <input type="text" name="firstname">
                <span class="req">*</span>
                <span class="error-text"><?php echo $fnameErr; ?></span>
            </div>

            <div class="row">
                <label>Last name:</label>
                <input type="text" name="lastname">
                <span class="req">*</span>
                <span class="error-text"><?php echo $lnameErr; ?></span>
            </div>

            <div class="row">
                <label>Date of Birth:</label>
                <input type="date" name="dob">
                <span class="req">*</span>
                <span class="error-text"><?php echo $dobErr; ?></span>
            </div>

            <button type="submit" class="submit-btn">Submit</button>
        </form>
    </div>

</body>
</html>