<script>
	// Import the main CSS file
	import '../app.css';

		// Get the child content (pages inside layout)
	let { children } = $props();
</script>
	<!-- Main layout wrapper -->
<div class="min-h-screen flex flex-col font-sans bg-white text-gray-900">
       <!-- Header / Top navigation bar -->
    <header class="bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white shadow-lg">
      <div class="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
     
		  <!-- Logo and title -->
        <div class="text-2xl font-black tracking-wider">📸 LeaInstas</div>
  
           <!-- Main navigation links -->
        <nav class="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <a href="/" class="hover:underline">Home</a>
          <a href="/upload" class="hover:underline">Upload</a>
          <a href="/top" class="hover:underline">Top Bilder</a>
        </nav>
		        <!-- Login and Register buttons -->
        <div class="flex gap-3">
			<a href="/login" class="bg-white text-pink-600 px-4 py-1.5 rounded-lg font-semibold shadow-sm hover:bg-gray-100 transition">Login</a>
			<a href="/register" class="bg-transparent border border-white px-4 py-1.5 rounded-lg hover:bg-white hover:text-pink-600 transition">Register</a>
        </div>
      </div>
    </header>
  
    <main class="flex-grow container mx-auto p-6">

		{@render children()}


    </main>
  
      
    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 text-sm mt-12 pt-10">
      <div class="max-w-7xl mx-auto px-6 grid gap-8 md:grid-cols-3">
    
		
   <!-- Footer logo and description -->
        <div>
          <h2 class="text-white font-semibold mb-2">📷 LeaInstas</h2>
          <p>Deine kreative Plattform für das Teilen und Bewerten von Bildern.</p>
        </div>
  
    
		   <!-- Footer navigation links -->
        <div>
          <h2 class="text-white font-semibold mb-2">Navigation</h2>
          <div class="flex flex-col gap-1">
            <a href="/" class="hover:underline">Startseite</a>
            <a href="/upload" class="hover:underline">Bild hochladen</a>
            <a href="/top" class="hover:underline">Top Bilder</a>
          </div>
        </div>
  
      
		  <!-- Social media links -->
        <div>
          <h2 class="text-white font-semibold mb-2">Folge uns</h2>
          <div class="flex items-center gap-4">
            <a href="https://mail.google.com/mail/u/0/#inbox/FMfcgzQZTzgplMKMxsJHJLdcswCWQxWL" class="hover:text-white">📧 Email</a>
            <a href="https://www.instagram.com/" class="https://www.instagram.com">📸 Instagram</a>
            <a href="https://x.com" class="hover:text-white">🐦 Twitter</a>
          </div>
        </div>
      </div>
      <div class="mt-8 border-t border-gray-700 text-center py-4 text-xs">
        © 2025 LeaInstas – Mit Liebe gemacht.
      </div>
    </footer>
  </div>
  