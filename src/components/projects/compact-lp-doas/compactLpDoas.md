# Building a compact & autonomous long-path DOAS

\
The graph below shows the variation of the nitrogen dioxide (NO2) mixing ratio in the atmosphere over a day. The mixing ratio is a measure of the concentration of a trace gas in the atmosphere. The ratio is measured above a well used street. 

Nitrogen oxides (NO & NO2) are poisonous to humans and were at the center of the diesel scandal.

The graph shows a pronounced peak in the morning between 6 and 10 AM. This can likely be attributed to commuters traffic, since combustion engines are one of the main sources of nitrogen oxides.

\
![No2 mixing ratio](https://github.com/nikoduesentrieb/portfolio/blob/gh-pages/static/media/no2mixingratio.63797f17.jpg?raw=true)
*NO2 Mixing ratio over a day. Every black square is one measurement. The 2σ error bars are not visible on this scale. The brown bars are indicative of the amount of commuter traffic as measured from other sources. The lower amounts of NO2 in the afternoon are probably due to higher photolysis.*

\
This graph is one of the results of my master thesis, which I wrote at the institute of environmental physics in Heidelberg in 2015. To measure it, I built a compact remote sensing instrument, using the [long-path DOAS technique](https://en.wikipedia.org/wiki/Differential_optical_absorption_spectroscopy).

DOAS compares a spectra of a light source before and after the light traveled through the atmosphere. Since the light interacts with trace gases in the atmosphere in a characteristic way and dependent on the concentration, this comparison can be used to retrieve concentrations of trace gases in the atmosphere.

The picture below shows a schematic of the instrument.

\
![Schematic of the compact long-path DOAS instrument](https://github.com/nikoduesentrieb/portfolio/blob/gh-pages/static/media/schematics-lp-doas.1124f459.jpg?raw=true)
*A spectrograph, a telescope, LEDs, stepper motors, air filtering, temperature stabilization an Arduino based electronics controller and an embedded PC are integrated into a ~ 35 cm wide box. The LEDs are coupled into the telescope via a fiber bundle. Moving the fiber bundle in front of the main mirror of the telescope allows to direct the light path to a retro reflector mirror.*

\
This setup allows to retrieve all the data required for a DOAS measurement. The instrument sends out the light of the LEDs as a light beam. A retro reflector, stationed some kilometers away reflects the light beam back and couples it back into the same telescope and subsequently back into the spectrograph. 
By looking at the LEDs directly and comparing to the light after it traveled through the atmosphere, concentrations of atmospheric trace gases such as nitrogen dioxide and ozone can be retrieved.

\
Various actuators in the instrument need to be controlled and spectra taken at the right time. This is done by a control software, I wrote during the master thesis. After configuration it allows the instrument to autonomously take measurements. 

One notable example is the automatic optimization of the light beam direction. It makes sure, that the light beam is directed in such a way, that it it hits the retro reflector perfectly, to maximize the light coming back. While this is crucial for measuring low concentrations, one can imagine its quite hard to hit a mirror with an approximate diameter of 1 m at a distance of several kilometers, with a light beam of an approximate diameter of 20 cm. 
The control algorithm moves the light beam through multiple directions in a spiral, thereby pointing it at multiple points in the plane of the retro reflector. It identifies the direction where the intensity of light coupled back into the instrument is highest and moves the light beam to that direction. That way a long autonomous functioning is ensured.