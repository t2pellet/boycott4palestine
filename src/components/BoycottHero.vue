<template>
  <div class="relative hero max-w-full md:max-w-screen-lg">
    <div class="hero-content max-w-full overflow-hidden md:gap-8">
      <img
        src="/palestine-flag.png"
        class="hidden sm:flex rounded-3xl shadow-lg w-1/3"
        alt="Palestinian Flag"
      />
      <div
        class="flex flex-col max-w-full justify-between sm:h-64 p-4 rounded-box bg-base-200/60 sm:w-2/3 h-fit"
      >
        <div>
          <h1 class="text-2xl font-bold text-center">
            <span class="text-primary font-bold">Boycott</span>
            for
            <span class="text-success font-bold">Palestine</span>
          </h1>
          <img
            src="/palestine-flag-wide.png"
            class="sm:hidden rounded-box shadow-2xl w-2/3 mx-auto mt-3"
            alt="Palestinian Flag"
          />
          <p class="text-sm text-center py-4">
            Israel continues to commit <b>genocide</b> against the Palestinian people. This website
            aims to serve as a tool to <b>boycott</b> companies supporting Israel and it's reign of
            terror.<br /><br />
            Search for a company or scan a barcode.
          </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a
            class="btn btn-secondary btn-wide sm:w-40"
            href="https://remix.aljazeera.com/aje/PalestineRemix/timeline_main.html"
            target="_blank"
            >What's going on?</a
          >
          <RouterLink class="btn btn-primary btn-wide sm:w-40" to="/scan">
            Scan Barcode
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
